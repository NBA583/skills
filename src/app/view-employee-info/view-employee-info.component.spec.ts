import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewEmployeeInfoComponent } from './view-employee-info.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

const MatDialogMock = {
    open: () => {},
    close: () => {}
};
const mockData = {
    personalSignal : {
        firstName: 'Nagendra',
        middleName: 'Babu',
        lastName: 'Anneboina',
        gender: 'Male',
        email: 'nag@mail.com',
        mobile: '9089089878',
        knownLanguages: [{name: 'English'},{name: 'Telugu'}]
    },
    workExperienceSignal : () => {
        return {
            orgName: "orgName",
            role: "role",
            currentOrganization: false,
            startDate: new Date(),
            endDate: new Date()
        }
    },
    educationSignal : () => {
        return {
            education: 'education',
            instituteName: 'instituteName',
            course: 'course',
            specialization: 'specialization',
            percentage: 90,
            yearPassedOut: '04/2020'
        }
    },
    skillSignal : () => {
        return {
            skill: 'skill',
            level: 'level',
            softwareVersion: 'softwareVersion',
            experience: '8.5',
            lastUsed: '04/2020'
        }
    }
  }

describe('ViewEmployeeInfoComponent', () => {
    let component: ViewEmployeeInfoComponent;
    let fixture: ComponentFixture<ViewEmployeeInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ViewEmployeeInfoComponent,
                NoopAnimationsModule,
                MatExpansionModule,
                MatButtonModule
            ],
            providers: [
                provideNativeDateAdapter(),
                {provide: MatDialogRef, useValue: MatDialogMock},
                {provide: MAT_DIALOG_DATA, useValue: mockData},
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(ViewEmployeeInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call method onNoClick', () => {
        component.onNoClick();
        expect(component.onNoClick).toBeTruthy();
    });
    
})