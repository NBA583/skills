import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { WorkExperienceComponent } from '../work-experience/work-experience.component';
import { EducationComponent } from '../education/education.component';
import { SkillComponent } from '../skill/skill.component';
import { alphanumericValidator, emailValidator, mobileNumberValidator } from '../utils/validators';
import { ViewEmployeeInfoComponent } from '../view-employee-info/view-employee-info.component';
import { Subscription } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { debounceTime } from 'rxjs/operators';

export interface Language {
  name: string;
}
export interface WorkExperienceElement {
  orgName: string;
  role: string;
  startDate: string;
  endDate: string;
  currentOrganization: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    WorkExperienceComponent,
    EducationComponent,
    SkillComponent,
    ViewEmployeeInfoComponent,
    MatProgressBarModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  public isLinear = true;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  languages: Language[] = [{ name: 'English' }];

  announcer = inject(LiveAnnouncer);
  // inject formBuilder:
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);

  // define formgroup/s
  personalInfoFormGroup = this.fb.group({
    firstName: ['', [Validators.required, alphanumericValidator]],
    middleName: ['', [alphanumericValidator]],
    lastName: ['', [Validators.required, alphanumericValidator]],
    gender: ['Male', Validators.required],
    email: ['', [Validators.required, emailValidator]],
    mobile: ['', [Validators.required, mobileNumberValidator, Validators.minLength(10), Validators.maxLength(10)]],
    knownLanguages: [this.languages, Validators.required],
  });
  workExperienceFormGroup = this.fb.group({
    recordsLength: [0, [Validators.required, Validators.min(1)]]
  });
  educationFormGroup = this.fb.group({
    recordsLength: [0, [Validators.required, Validators.min(1)]]
  });
  skillsFormGroup = this.fb.group({
    recordsLength: [0, [Validators.required, Validators.min(1)]]
  });

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our language
    if (value) {
      this.languages.push({ name: value });
      this.personalInfoFormGroup.get('knownLanguages')?.setValue(this.languages);
    }

    // Clear the input value
    event?.chipInput!.clear();
  }

  remove(language: Language): void {
    const index = this.languages.map(v=>v.name).indexOf(language.name);

    if (index >= 0) {
      this.languages.splice(index, 1);
      this.personalInfoFormGroup.get('knownLanguages')?.setValue(this.languages);

      this.announcer.announce(`Removed ${language}`);
    }
  }

  edit(language: Language, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove language if it no longer has a name
    if (!value) {
      this.remove(language);
      return;
    }

    // Edit existing language
    const index = this.languages.map(v=>v.name).indexOf(language.name);
    if (index >= 0) {
      this.languages[index].name = value;
      this.personalInfoFormGroup.get('knownLanguages')?.setValue(this.languages);
    }

  }

  updateWEFG(length: number) {
      this.workExperienceFormGroup.get('recordsLength')?.setValue(length);
  }
  updateEFG(length: number) {
      this.educationFormGroup.get('recordsLength')?.setValue(length);
  }
  updateSFG(length: number) {
      this.skillsFormGroup.get('recordsLength')?.setValue(length);
  }

  viewEmpInfo(): void {
    this.dialog.open(ViewEmployeeInfoComponent, {
      data: {
        personalSignal: this.personalSignal(),
        workExperienceSignal: this.workExperienceSignal,
        educationSignal: this.educationSignal,
        skillSignal: this.skillSignal
      },
      disableClose: false,
      hasBackdrop: true,
      height: '540px',
      width: '990px'
    });
  }

  // progress = 0;
  derivedProgress: any;
  personalSignal: any;
  personalProgressSignal = signal(0);
  personalFormObserver!: Subscription;
  workExperienceProgressSignal = signal(0);
  workExperienceFormObserver!: Subscription;
  educationProgressSignal = signal(0);
  educationFormObserver!: Subscription;
  skillProgressSignal = signal(0);
  skillFormObserver!: Subscription;

  ngOnInit(): void {
    this.personalSignal = signal({});
    this.personalFormObserver = this.personalInfoFormGroup.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      this.personalSignal.set(data);
      this.personalProgressSignal.set(Number(this.calculateFormProgress(this.personalInfoFormGroup)));
    });
    this.workExperienceFormObserver = this.workExperienceFormGroup.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      this.workExperienceProgressSignal.set(Number(this.calculateFormProgress(this.workExperienceFormGroup)));
    });
    this.educationFormObserver = this.educationFormGroup.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      this.educationProgressSignal.set(Number(this.calculateFormProgress(this.educationFormGroup)));
    });
    this.skillFormObserver = this.skillsFormGroup.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      this.skillProgressSignal.set(Number(this.calculateFormProgress(this.skillsFormGroup)));
    });
    this.derivedProgress = computed(() => {
      return (this.personalProgressSignal() + this.workExperienceProgressSignal() +
      this.educationProgressSignal() + this.skillProgressSignal())/4;
    });
    // this.progress = this.derivedProgress();
  }
  
  workExperienceSignal: any;
  educationSignal: any;
  skillSignal: any;
  @ViewChild('WorkExperienceComponent') workExperience!: WorkExperienceComponent;
  @ViewChild('EducationComponent') educationComponent!: EducationComponent;
  @ViewChild('SkillComponent') skillComponent!: SkillComponent;

  ngOnDestroy(): void {
    this.personalFormObserver.unsubscribe();
  }
  ngAfterViewInit() {
    // child is set
        this.workExperienceSignal = this.workExperience?.workExperienceSignal,
        this.educationSignal = this.educationComponent?.educationSignal,
        this.skillSignal = this.skillComponent?.skillSignal
  }

  calculateFormProgress(form: FormGroup): number {
    const controlCount = Object.keys(form.controls).length;
    let validCount = 0;
    for( const [key, value] of Object.entries(form.controls)) {
      if (value.valid) validCount++;
    }
    return validCount / controlCount * 100;
  }  
  
}
