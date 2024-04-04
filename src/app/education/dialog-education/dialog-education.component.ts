import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { alphanumericValidator } from '../../utils/validators';

@Component({
  selector: 'app-dialog-education',
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
    MatDatepickerModule
  ],
  templateUrl: './dialog-education.component.html',
  styleUrl: './dialog-education.component.css'
})
export class DialogEducationComponent implements OnInit {
  
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<DialogEducationComponent>);
  cdRef = inject(ChangeDetectorRef);
  data = inject(MAT_DIALOG_DATA);
  action = 'Add';

  ngOnInit(){
    if(this.data){
      this.action = 'Update';
      this.educationFormGroup.setValue(this.data);
    }
  }

  educationFormGroup = this.fb.group({
    education: ['', [Validators.required, alphanumericValidator]],
    instituteName: ['', [Validators.required, alphanumericValidator]],
    course: ['', [Validators.required, alphanumericValidator]],
    specialization: ['', [alphanumericValidator]],
    percentage: [0, [Validators.required, Validators.max(100)]],
    yearPassedOut: ['', Validators.required]
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close({data: this.educationFormGroup.value});
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

}
