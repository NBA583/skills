import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillComponent } from './skill.component';
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogSkillComponent } from './dialog-skill/dialog-skill.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

const MatDialogMock = {
    open: () => {}
};
const mockData = {
    skill: 'skill',
    level: 'level',
    softwareVersion: 'softwareVersion',
    experience: '8.5',
    lastUsed: '04/2020'
  }
describe('SkillComponent', () => {
    let component: SkillComponent;
    let fixture: ComponentFixture<SkillComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SkillComponent,
                DialogSkillComponent,
                MatDialogModule,
            ],
            providers: [
              {
                provide: MatDialogRef, useValue: MatDialogMock
              }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(SkillComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call method openDialog', () => {
        jest.spyOn(component.dialog, 'open').mockReturnValue({
            afterClosed: ()=>of({mockData})} as MatDialogRef<typeof DialogSkillComponent>);
        component.openDialog();
        expect(component.openDialog).toBeTruthy();
    });

    it('should call method editskilldata', () => {
        component.skilldata().push(component.newskilldata());
        component.skillIndexData(0).setValue(mockData);
        jest.spyOn(component.dialog, 'open').mockReturnValue({
            afterClosed: ()=>of({mockData})} as MatDialogRef<typeof DialogSkillComponent>);
        component.editskilldata(0);
        expect(component.editskilldata).toBeTruthy();
    });

    it('should call method removeskilldata', () => {
        component.skilldata().push(component.newskilldata());
        component.skillIndexData(0).setValue(mockData);
        jest.spyOn(component.dialog, 'open').mockReturnValue({
            afterClosed: ()=>of({mockData})} as MatDialogRef<typeof ConfirmDialogComponent>);
        component.removeskilldata(0);
        expect(component.removeskilldata).toBeTruthy();
    });

})