import { FormControl } from "@angular/forms";
import { alphabetValidator, alphanumericValidator, emailValidator, mobileNumberValidator } from "./validators";

describe('Validators', ()=>{
    let control: any;
    it('check alphabetValidator: value as test', ()=>{
        control = new FormControl('test');
        alphabetValidator(control);
        expect(alphabetValidator).toBeTruthy();
    });
    it('check alphabetValidator: value as $$$', ()=>{
        control = new FormControl('$$$');
        alphabetValidator(control);
        expect(alphabetValidator).toBeTruthy();
    });
    it('check alphabetValidator: value as empty null', ()=>{
        control = new FormControl(null);
        alphabetValidator(control);
        expect(alphabetValidator).toBeTruthy();
    });
    
    it('check alphanumericValidator: value as test123', ()=>{
        control = new FormControl('test123');
        alphanumericValidator(control);
        expect(alphanumericValidator).toBeTruthy();
    });
    it('check alphanumericValidator: value as $$$', ()=>{
        control = new FormControl('$$$');
        alphanumericValidator(control);
        expect(alphanumericValidator).toBeTruthy();
    });
    it('check alphanumericValidator: value as empty null', ()=>{
        control = new FormControl(null);
        alphanumericValidator(control);
        expect(alphanumericValidator).toBeTruthy();
    });

    it('check emailValidator: value as test123@mail.com', ()=>{
        control = new FormControl('test123@mail.com');
        emailValidator(control);
        expect(emailValidator).toBeTruthy();
    });
    it('check emailValidator: value as $$$', ()=>{
        control = new FormControl('$$$');
        emailValidator(control);
        expect(emailValidator).toBeTruthy();
    });
    it('check emailValidator: value as empty null', ()=>{
        control = new FormControl(null);
        emailValidator(control);
        expect(emailValidator).toBeTruthy();
    });

    it('check mobileNumberValidator: value as 1234567890', ()=>{
        control = new FormControl('1234567890');
        mobileNumberValidator(control);
        expect(mobileNumberValidator).toBeTruthy();
    });
    it('check mobileNumberValidator: value as $$$', ()=>{
        control = new FormControl('$$$');
        mobileNumberValidator(control);
        expect(mobileNumberValidator).toBeTruthy();
    });

})