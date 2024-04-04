import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationComponent } from './education.component';
import { of } from 'rxjs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogEducationComponent } from './dialog-education/dialog-education.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

const MatDialogMock = {
    open: () => {}
};
const mockData = {
    education: 'education',
    instituteName: 'instituteName',
    course: 'course',
    specialization: 'specialization',
    percentage: 90,
    yearPassedOut: '04/2020'
  }
describe('EducationComponent', () => {
    let component: EducationComponent;
    let fixture: ComponentFixture<EducationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                EducationComponent,
                DialogEducationComponent,
                MatDialogModule,
            ],
            providers: [
              {
                provide: MatDialogRef, useValue: MatDialogMock
              }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(EducationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call method openDialog', () => {
        jest.spyOn(component.dialog, 'open').mockReturnValue({
            afterClosed: ()=>of({mockData})} as MatDialogRef<typeof DialogEducationComponent>);
        component.openDialog();
        expect(component.openDialog).toBeTruthy();
    });

    it('should call method editeducationdata', () => {
        component.educationdata().push(component.neweducationdata());
        component.educationIndexData(0).setValue(mockData);
        jest.spyOn(component.dialog, 'open').mockReturnValue({
            afterClosed: ()=>of({mockData})} as MatDialogRef<typeof DialogEducationComponent>);
        component.editeducationdata(0);
        expect(component.editeducationdata).toBeTruthy();
    });

    it('should call method removeeducationdata', () => {
        component.educationdata().push(component.neweducationdata());
        component.educationIndexData(0).setValue(mockData);
        jest.spyOn(component.dialog, 'open').mockReturnValue({
            afterClosed: ()=>of({mockData})} as MatDialogRef<typeof ConfirmDialogComponent>);
        component.removeeducationdata(0);
        expect(component.removeeducationdata).toBeTruthy();
    });

})