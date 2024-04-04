import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-employee-info',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    DatePipe
  ],
  templateUrl: './view-employee-info.component.html',
  styleUrl: './view-employee-info.component.css'
})
export class ViewEmployeeInfoComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ViewEmployeeInfoComponent>)
  personalInfo: any = {};
  personalInfoEnabled = false;
  personalInfoColumns: any[] = [
    {key: 'firstName', label: 'First Name'},
    {key: 'middleName', label: 'Middle Name'},
    {key: 'lastName', label: 'Last Name'},
    {key: 'gender', label: 'Gender'},
    {key: 'email', label: 'Email'},
    {key: 'mobile', label: 'Mobile'},
    {key: 'knownLanguages', label: 'Languages Known'}
  ];

  workExperienceInfo: any;
  workExperienceInfoEnabled = false;
  workExperienceInfoColumns: any[] = [
    {key: 'orgName', label: 'Organization'},
    {key: 'role', label: 'Role'},
    {key: 'startDate', label: 'Start Date'},
    {key: 'endDate', label: 'End Date'}
  ];

  educationInfo: any;
  educationInfoEnabled = false;
  educationInfoColumns: any[] = [
    {key: 'education', label: 'Education'},
    {key: 'instituteName', label: 'Institute Name'},
    {key: 'course', label: 'Course'},
    {key: 'specialization', label: 'Specialization'},
    {key: 'percentage', label: 'Percentage'},
    {key: 'yearPassedOut', label: 'Year'}
  ];

  skillInfo: any;
  skillInfoEnabled = false;
  skillInfoColumns: any[] = [
    {key: 'skill', label: 'Skill'},
    {key: 'level', label: 'Level'},
    {key: 'softwareVersion', label: 'Software Version'},
    {key: 'experience', label: 'Experience'},
    {key: 'lastUsed', label: 'Last Used'}
  ];

  ngOnInit(): void {
    this.getPersonalSignalData();
    this.getWorkExperienceData();
    this.getEducationData();
    this.getSkillData();
    console.log(this);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

formatArrayData(value: any) {
    if(value instanceof Array){
      let pa = [...new Set(value)];
      if(typeof pa[0] === 'string'){
        return pa;
      } else {
        return pa.map(v=>{return v.name}).join(', ');
      }
    } else {
      return value;
    }
  }

  async getPersonalSignalData() {
    for (let [key, value] of Object.entries(this.data.personalSignal)) {
      this.personalInfo[key] = await this.formatArrayData(value);
    }
    this.personalInfoEnabled = Object.entries(this.personalInfo).length > 0;
  }

  async getWorkExperienceData() {
    this.workExperienceInfo = this.data.workExperienceSignal();
    this.workExperienceInfoEnabled = this.workExperienceInfo.length > 0;
  }
  async getEducationData() {
    this.educationInfo = this.data.educationSignal();
    this.educationInfoEnabled = this.educationInfo.length > 0;
  }
  async getSkillData() {
    this.skillInfo = this.data.skillSignal();
    this.skillInfoEnabled = this.skillInfo.length > 0;
  }

}
