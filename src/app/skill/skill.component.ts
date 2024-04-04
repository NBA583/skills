import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogSkillComponent } from './dialog-skill/dialog-skill.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { alphanumericValidator } from '../utils/validators';
import { Subscription } from 'rxjs';

export interface SkillElement {
  skill: string;
  level: string;
  softwareVersion: string;
  experience: string;
  lastUsed: string;
}

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css'
})
export class SkillComponent implements OnInit, OnDestroy {
  
  @Output() updateSFG = new EventEmitter();

  // inject formBuilder:
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);

  // define formgroup/s
  skillFormGroup = this.fb.group({
    skill: this.fb.array([])
  });
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogSkillComponent, {
      // data: {name: this.name, animal: this.animal},
      disableClose: true,
      hasBackdrop: true,
      height: '400px',
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let length = Number(this.skillFormGroup.get('skill')?.value.length);
        this.skilldata().push(this.newskilldata());
        this.skillIndexData(length).setValue(result.data);
        this.dataSource = <SkillElement[]>(this.skillFormGroup.get('skill')?.value);
        this.updateSFG.emit(this.dataSource.length);
      }
    });
  }

  skilldata(): FormArray {
    return this.skillFormGroup.get('skill') as FormArray;
  }
  newskilldata(): FormGroup {
    return this.fb.group({
      skill: ['', [Validators.required, alphanumericValidator]],
      level: ['', Validators.required],
      softwareVersion: ['', [alphanumericValidator]],
      experience: ['', Validators.required],
      lastUsed: ['', Validators.required]
    });
  }
  skillList: any;

  skillIndexData(index: number) {
    this.skillList = this.skillFormGroup.get('skill') as FormArray;
    const formGroup = this.skillList.controls[index] as FormGroup;
    return formGroup;
  }
  editskilldata(i: number) {
    const dialogRef = this.dialog.open(DialogSkillComponent, {
      data: this.skilldata().controls[i].value,
      disableClose: true,
      hasBackdrop: true,
      height: '400px',
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.skillIndexData(i).setValue(result.data);
        this.dataSource = <SkillElement[]>(this.skillFormGroup.get('skill')?.value);
        this.updateSFG.emit(this.dataSource.length);
      }
    });
  }
  removeskilldata(i: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.skilldata().controls[i].value,
      disableClose: true,
      hasBackdrop: true,
      height: '150px',
      width: '280px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.skilldata().removeAt(i);
        this.dataSource = <SkillElement[]>(this.skillFormGroup.get('skill')?.value);
        this.updateSFG.emit(this.dataSource.length);
      }
    });
  }

  ELEMENT_DATA: SkillElement[] = [];
  displayedColumns: string[] = ['skill', 'level', 'softwareVersion', 'experience',
   'lastUsed', 'action'];
  dataSource = this.ELEMENT_DATA;

  // Skill : code - end

  skillSignal: any;
  skillFormObserver!: Subscription;
  ngOnInit(): void {
    this.skillSignal = signal({});
    this.skillFormObserver = this.skillFormGroup.valueChanges.subscribe(data => {
      this.skillSignal.set(data.skill);
    });
  }

  ngOnDestroy(): void {
    this.skillFormObserver.unsubscribe();
  }

}
