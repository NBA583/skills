import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEducationComponent } from './dialog-education.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

const MatDialogMock = {
    open: () => {},
    close: () => {}
};
const mockData = {
    education: 'education',
    instituteName: 'instituteName',
    course: 'course',
    specialization: 'specialization',
    percentage: 90,
    yearPassedOut: '04/2020'
  }

describe('DialogEducationComponent', () => {
    let component: DialogEducationComponent;
    let fixture: ComponentFixture<DialogEducationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DialogEducationComponent,
                BrowserAnimationsModule
            ],
            providers: [
                provideNativeDateAdapter(),
                {provide: MatDialogRef, useValue: MatDialogMock},
                {provide: MAT_DIALOG_DATA, useValue: mockData},
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(DialogEducationComponent);
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

    it('should call method onAdd', () => {
        component.educationFormGroup.setValue(JSON.parse(JSON.stringify(mockData)));
        component.onAdd();
        expect(component.onAdd).toBeTruthy();
    });
    
})