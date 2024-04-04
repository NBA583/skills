import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { alphanumericValidator } from '../../utils/validators';
import { MatSelectModule } from '@angular/material/select';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import moment, { Moment } from 'moment';
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialog-skill',
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
    MatSelectModule
  ],
  providers: [
    provideMomentDateAdapter(MY_FORMATS)
  ],
  templateUrl: './dialog-skill.component.html',
  styleUrl: './dialog-skill.component.css'
})
export class DialogSkillComponent implements OnInit {
  
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<DialogSkillComponent>);
  cdRef = inject(ChangeDetectorRef);
  data = inject(MAT_DIALOG_DATA);
  action = 'Add';
  levels = ['Beginner', 'Proficient', 'Expert']

  ngOnInit(){
    if(this.data){
      this.action = 'Update';
      this.skillFormGroup.setValue(this.data);
    }
  }

  skillFormGroup = this.fb.group({
    skill: ['', [Validators.required, alphanumericValidator]],
    level: ['', Validators.required],
    softwareVersion: ['', [alphanumericValidator]],
    experience: ['', [Validators.required, Validators.min(0.1)]],
    lastUsed: [moment(), Validators.required]
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close({data: this.skillFormGroup.value});
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.skillFormGroup.get('lastUsed')?.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.skillFormGroup.get('lastUsed')?.setValue(ctrlValue);
    datepicker.close();
  }

}

