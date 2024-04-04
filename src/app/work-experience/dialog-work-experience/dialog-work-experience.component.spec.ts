import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogWorkExperienceComponent } from './dialog-work-experience.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

const MatDialogMock = {
    open: () => {},
    close: () => {}
};
const mockData = {
    orgName: "orgName",
    role: "role",
    currentOrganization: false,
    startDate: new Date(),
    endDate: new Date()
  }

describe('DialogWorkExperienceComponent', () => {
    let component: DialogWorkExperienceComponent;
    let fixture: ComponentFixture<DialogWorkExperienceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DialogWorkExperienceComponent,
                BrowserAnimationsModule
            ],
            providers: [
                provideNativeDateAdapter(),
                {provide: MatDialogRef, useValue: MatDialogMock},
                {provide: MAT_DIALOG_DATA, useValue: mockData},
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(DialogWorkExperienceComponent);
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
        component.workExperienceFormGroup.setValue(JSON.parse(JSON.stringify(mockData)));
        component.onAdd();
        expect(component.onAdd).toBeTruthy();
    });

    it('should call method isCurrentOrganization: true', () => {
        component.workExperienceFormGroup.setValue(JSON.parse(JSON.stringify(mockData)));
        component.isCurrentOrganization(true);
        expect(component.onAdd).toBeTruthy();
    });
    it('should call method isCurrentOrganization: false', () => {
        component.workExperienceFormGroup.setValue(JSON.parse(JSON.stringify(mockData)));
        component.isCurrentOrganization(false);
        expect(component.onAdd).toBeTruthy();
    });

    it('should call method addEvent', () => {
        
        const inputElement: HTMLElement = fixture.debugElement.query(
            By.css('.input-dp-id')
        ).nativeElement;
        component.workExperienceFormGroup.setValue(JSON.parse(JSON.stringify(mockData)));
        component.addEvent('change', {
            value: new Date(),
            target: null!,
            targetElement: inputElement
        });
        expect(component.addEvent).toBeTruthy();
    });
    
})