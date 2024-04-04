import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogEducationComponent } from './dialog-education/dialog-education.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { alphanumericValidator } from '../utils/validators';
import { Subscription } from 'rxjs';

export interface EducationElement {
  education: string;
  instituteName: string;
  course: string;
  specialization: string;
  percentage: number;
  yearPassedOut: string;
}
@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit, OnDestroy  {
  
  @Output() updateEFG = new EventEmitter();

  // inject formBuilder:
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);

  // define formgroup/s
  educationFormGroup = this.fb.group({
    education: this.fb.array([])
  });
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEducationComponent, {
      // data: {name: this.name, animal: this.animal},
      disableClose: true,
      hasBackdrop: true,
      height: '400px',
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let length = Number(this.educationFormGroup.get('education')?.value.length);
        this.educationdata().push(this.neweducationdata());
        this.educationIndexData(length).setValue(result.data);
        this.dataSource = <EducationElement[]>(this.educationFormGroup.get('education')?.value);
        this.updateEFG.emit(this.dataSource.length);
      }
    });
  }

  educationdata(): FormArray {
    return this.educationFormGroup.get('education') as FormArray;
  }
  neweducationdata(): FormGroup {
    return this.fb.group({
      education: ['', [Validators.required, alphanumericValidator]],
      instituteName: ['', [Validators.required, alphanumericValidator]],
      course: ['', [Validators.required, alphanumericValidator]],
      specialization: ['', [alphanumericValidator]],
      percentage: [0, [Validators.required, Validators.max(100)]],
      yearPassedOut: ['', Validators.required]
    });
  }
  educationList: any;

  educationIndexData(index: number) {
    this.educationList = this.educationFormGroup.get('education') as FormArray;
    const formGroup = this.educationList.controls[index] as FormGroup;
    return formGroup;
  }
  editeducationdata(i: number) {
    const dialogRef = this.dialog.open(DialogEducationComponent, {
      data: this.educationdata().controls[i].value,
      disableClose: true,
      hasBackdrop: true,
      height: '400px',
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.educationIndexData(i).setValue(result.data);
        this.dataSource = <EducationElement[]>(this.educationFormGroup.get('education')?.value);
        this.updateEFG.emit(this.dataSource.length);
      }
    });
  }
  removeeducationdata(i: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.educationdata().controls[i].value,
      disableClose: true,
      hasBackdrop: true,
      height: '150px',
      width: '280px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.educationdata().removeAt(i);
        this.dataSource = <EducationElement[]>(this.educationFormGroup.get('education')?.value);
        this.updateEFG.emit(this.dataSource.length);
      }
    });
  }

  ELEMENT_DATA: EducationElement[] = [];
  displayedColumns: string[] = ['education', 'instituteName', 'course', 'specialization',
   'percentage', 'yearPassedOut', 'action'];
  dataSource = this.ELEMENT_DATA;

  // Education : code - end

  educationSignal: any;
  educationFormObserver!: Subscription;
  ngOnInit(): void {
    this.educationSignal = signal({});
    this.educationFormObserver = this.educationFormGroup.valueChanges.subscribe(data => {
      this.educationSignal.set(data.education);
    });
  }

  ngOnDestroy(): void {
    this.educationFormObserver.unsubscribe();
  }

}
