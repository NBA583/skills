import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DialogWorkExperienceComponent } from './dialog-work-experience/dialog-work-experience.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { alphanumericValidator } from '../utils/validators';
import { Subscription } from 'rxjs';

export interface WorkExperienceElement {
  orgName: string;
  role: string;
  startDate: string;
  endDate: string;
  currentOrganization: boolean;
}

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule
  ],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent implements OnInit, OnDestroy {
  
  @Output() updateWEFG = new EventEmitter();

  // inject formBuilder:
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  
  // define formgroup/s
  workExperienceFormGroup = this.fb.group({
    workExperience: this.fb.array([])
  });

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogWorkExperienceComponent, {
      // data: {name: this.name, animal: this.animal},
      disableClose: true,
      hasBackdrop: true,
      height: '540px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let length = Number(this.workExperienceFormGroup.get('workExperience')?.value.length);
        this.workExperiencedata().push(this.newworkExperiencedata());
        this.workExperienceIndexData(length).setValue(result.data);
        this.dataSource = <WorkExperienceElement[]>(this.workExperienceFormGroup.get('workExperience')?.value);
        this.updateWEFG.emit(this.dataSource.length);
      }
    });
  }

  workExperiencedata(): FormArray {
    return this.workExperienceFormGroup.get('workExperience') as FormArray;
  }
  
  newworkExperiencedata(): FormGroup {
    return this.fb.group({
      orgName: ['', [Validators.required, alphanumericValidator]],
      role: ['', [Validators.required, alphanumericValidator]],
      currentOrganization: [false],
      startDate: ['', Validators.required],
      endDate: ['']
    });
  }

  workExperienceList: any;
  workExperienceIndexData(index: number) {
    this.workExperienceList = this.workExperienceFormGroup.get('workExperience') as FormArray;
    const formGroup = this.workExperienceList.controls[index] as FormGroup;
    return formGroup;
  }
  editworkExperiencedata(i: number) {
    const dialogRef = this.dialog.open(DialogWorkExperienceComponent, {
      data: this.workExperiencedata().controls[i].value,
      disableClose: true,
      hasBackdrop: true,
      height: '540px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workExperienceIndexData(i).setValue(result.data);
        this.dataSource = <WorkExperienceElement[]>(this.workExperienceFormGroup.get('workExperience')?.value);
        this.updateWEFG.emit(this.dataSource.length);
      }
    });
  }
  removeworkExperiencedata(i: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.workExperiencedata().controls[i].value,
      disableClose: true,
      hasBackdrop: true,
      height: '150px',
      width: '280px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workExperiencedata().removeAt(i);
        this.dataSource = <WorkExperienceElement[]>(this.workExperienceFormGroup.get('workExperience')?.value);
        this.updateWEFG.emit(this.dataSource.length);
      }
    });
  }

  ELEMENT_DATA: WorkExperienceElement[] = [];
  displayedColumns: string[] = ['orgName', 'role', 'startDate', 'endDate', 'action'];
  dataSource = this.ELEMENT_DATA;

  workExperienceSignal: any;
  workExperienceFormObserver!: Subscription;
  ngOnInit(): void {
    this.workExperienceSignal = signal({});
    this.workExperienceFormObserver = this.workExperienceFormGroup.valueChanges.subscribe(data => {
      this.workExperienceSignal.set(data.workExperience);
    });
  }

  ngOnDestroy(): void {
    this.workExperienceFormObserver.unsubscribe();
  }

}
