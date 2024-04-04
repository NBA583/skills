import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkExperienceComponent } from './work-experience.component';
import { of } from 'rxjs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogWorkExperienceComponent } from './dialog-work-experience/dialog-work-experience.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

const MatDialogMock = {
    open: () => {}
};
const mockData = {
    orgName: 'orgName',
    role: 'role',
    currentOrganization: false,
    startDate: 'Tue Apr 02 2024 00:00:00 GMT+0530 (India Standard Time)',
    endDate: 'Tue Apr 03 2024 00:00:00 GMT+0530 (India Standard Time)'
  }
describe('WorkExperienceComponent', () => {
    let component: WorkExperienceComponent;
    let fixture: ComponentFixture<WorkExperienceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                WorkExperienceComponent,
                DialogWorkExperienceComponent,
                MatDialogModule,
            ],
            providers: [
              {
                provide: MatDialogRef, useValue: MatDialogMock
              }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(WorkExperienceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call method openDialog', () => {
        jest.spyOn(component.dialog, 'open').mockReturnValue({
            afterClosed: ()=>of({mockData})} as MatDialogRef<typeof DialogWorkExperienceComponent>);
        component.openDialog();
        expect(component.openDialog).toBeTruthy();
    });

    it('should call method editworkExperiencedata', () => {
        component.workExperiencedata().push(component.newworkExperiencedata());
        component.workExperienceIndexData(0).setValue(mockData);
        jest.spyOn(component.dialog, 'open').mockReturnValue({
            afterClosed: ()=>of({mockData})} as MatDialogRef<typeof DialogWorkExperienceComponent>);
        component.editworkExperiencedata(0);
        expect(component.editworkExperiencedata).toBeTruthy();
    });

    it('should call method removeworkExperiencedata', () => {
        component.workExperiencedata().push(component.newworkExperiencedata());
        component.workExperienceIndexData(0).setValue(mockData);
        jest.spyOn(component.dialog, 'open').mockReturnValue({
            afterClosed: ()=>of({mockData})} as MatDialogRef<typeof ConfirmDialogComponent>);
        component.removeworkExperiencedata(0);
        expect(component.removeworkExperiencedata).toBeTruthy();
    });

})