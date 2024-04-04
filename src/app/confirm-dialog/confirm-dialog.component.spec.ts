import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

const MatDialogMock = {
    open: () => {},
    close: () => {}
};

const mockData = {
    data: 'data'
  }

describe('ConfirmDialogComponent', () => {
    let component: ConfirmDialogComponent;
    let fixture: ComponentFixture<ConfirmDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ConfirmDialogComponent,
                BrowserAnimationsModule
            ],
            providers: [
              {provide: MatDialogRef, useValue: MatDialogMock},
              {provide: MAT_DIALOG_DATA, useValue: mockData},
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(ConfirmDialogComponent);
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
        component.onAdd();
        expect(component.onAdd).toBeTruthy();
    });
    
})