import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent, Language } from './home.component';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatChipEditedEvent, MatChipInput, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { By } from '@angular/platform-browser';
import { ViewEmployeeInfoComponent } from '../view-employee-info/view-employee-info.component';

const MatDialogMock = {
    open: () => {}
};

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HomeComponent,
                MatChipsModule,
                MatStepperModule,
                BrowserAnimationsModule,
                ViewEmployeeInfoComponent,
                MatDialogModule
            ],
            providers: [
              {
                provide: MatDialogRef, useValue: MatDialogMock
              }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        component.languages = [{name:'English'}, {name:'Hindi'}, {name:'Telugu'}];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('should call add method: value as Hindi', () => {
        const inputElement: HTMLElement = fixture.debugElement.query(
            By.css('.input-language-id')
        ).nativeElement;
        component.add({
            input: inputElement,
            value: 'Hindi',
            chipInput: {clear: ()=>{}}
        } as MatChipInputEvent)
        expect(component.add).toBeTruthy();
    });
    it('should call add method: value as empty string', () => {
        const inputElement: HTMLElement = fixture.debugElement.query(
            By.css('.input-language-id')
        ).nativeElement;
        component.add({
            input: inputElement,
            value: '',
            chipInput: {clear: ()=>{}}
        } as MatChipInputEvent)
        expect(component.add).toBeTruthy();
    });

    it('should call remove method: index as 0', () => {
        component.remove({name: 'English'});
        expect(component.remove).toBeTruthy();
    });
    it('should call remove method: index as 1', () => {
        component.remove({name: 'Hindi'});
        expect(component.remove).toBeTruthy();
    });
    it('should call remove method: index as 2', () => {
        component.remove({name: 'Telugu'});
        expect(component.remove).toBeTruthy();
    });

    it('should call edit method: value as empty string', () => {
        component.edit({name: ''}, {value: ''} as MatChipEditedEvent);
        expect(component.edit).toBeTruthy();
    });
    it('should call edit method: value as Telugu', () => {
        component.edit({name: 'Telugu'}, {value: 'Telugu'} as MatChipEditedEvent);
        expect(component.edit).toBeTruthy();
    });

    it('should call updateWEFG method: length as 1', () => {
        component.updateWEFG(1);
        expect(component.updateWEFG).toBeTruthy();
    });
    it('should call updateEFG method: length as 1', () => {
        component.updateEFG(1);
        expect(component.updateWEFG).toBeTruthy();
    });
    it('should call updateSFG method: length as 1', () => {
        component.updateSFG(1);
        expect(component.updateSFG).toBeTruthy();
    });

    it('should call viewEmpInfo method:', () => {
        component.viewEmpInfo();
        expect(component.viewEmpInfo).toBeTruthy();
    });

})