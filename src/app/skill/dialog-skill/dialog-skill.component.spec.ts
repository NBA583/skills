import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogSkillComponent } from './dialog-skill.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

const MatDialogMock = {
    open: () => {},
    close: () => {}
};
const mockData = {
    skill: 'skill',
    level: 'level',
    softwareVersion: 'softwareVersion',
    experience: '8.5',
    lastUsed: '04/2020'
  }

describe('DialogSkillComponent', () => {
    let component: DialogSkillComponent;
    let fixture: ComponentFixture<DialogSkillComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DialogSkillComponent,
                BrowserAnimationsModule
            ],
            providers: [
                provideNativeDateAdapter(),
                {provide: MatDialogRef, useValue: MatDialogMock},
                {provide: MAT_DIALOG_DATA, useValue: mockData},
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(DialogSkillComponent);
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
        component.skillFormGroup.setValue(JSON.parse(JSON.stringify(mockData)));
        component.onAdd();
        expect(component.onAdd).toBeTruthy();
    });
    
})