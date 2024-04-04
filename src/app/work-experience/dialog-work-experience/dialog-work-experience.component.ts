import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule, MatDatepickerInputEvent} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import moment from 'moment';
import { alphanumericValidator } from '../../utils/validators';

@Component({
  selector: 'app-dialog-work-experience',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    MatSlideToggleModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-work-experience.component.html',
  styleUrl: './dialog-work-experience.component.css'
})
export class DialogWorkExperienceComponent implements OnInit {
  
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<DialogWorkExperienceComponent>);
  cdRef = inject(ChangeDetectorRef);
  data = inject(MAT_DIALOG_DATA);
  action = 'Add';

  ngOnInit(){
    if(this.data){
      this.action = 'Update';
      this.workExperienceFormGroup.setValue(this.data);
    }
  }

  workExperienceFormGroup = this.fb.group({
    orgName: ['', [Validators.required, alphanumericValidator]],
    role: ['', [Validators.required, alphanumericValidator]],
    currentOrganization: [false],
    startDate: ['', Validators.required],
    endDate: ['']
  });

  public minDate!: Date;
  moment = _rollupMoment || _moment;

  // set End Date picker
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.minDate = new Date(moment(event.value).format("MM/DD/YYYY"));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close({data: this.workExperienceFormGroup.value});
  }

  isCurrentOrganization(flag: boolean) {
    if (flag) {
      this.workExperienceFormGroup.get('endDate')?.setValidators([]);
      this.workExperienceFormGroup.get('endDate')?.setValue(null);
      this.workExperienceFormGroup.get('endDate')?.updateValueAndValidity();
    } else {
      this.workExperienceFormGroup.get('endDate')?.setValidators([Validators.required]);
      this.workExperienceFormGroup.get('endDate')?.updateValueAndValidity();
    }
    this.cdRef.detectChanges();
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

}
