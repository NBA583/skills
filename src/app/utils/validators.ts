import { FormControl } from "@angular/forms";

const alphabetLetters = /^[a-zA-Z]{1}[a-zA-Z ]+$/;
const alphanumericLetters = /^[0-9a-zA-Z]{1}[0-9a-zA-Z ]+$/;
const email = /^[a-zA-Z0-9._-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,6}$/;
const mobileNumber = /^[1-9]{1}[0-9]{9}$/;

const alphabetValidator = (control: FormControl) => {
    if (!control.value || control.value.match(alphabetLetters)) {
        return null;
    } else {
        return {invalid: true, alphanumeric: true}
    }
}
const alphanumericValidator = (control: FormControl) => {
    if (!control.value || control.value.match(alphanumericLetters)) {
        return null;
    } else {
        return {invalid: true, alphanumeric: true}
    }
}
const emailValidator = (control: FormControl) => {
    if (!control.value || control.value.match(email)) {
        return null;
    } else {
        return {invalid: true, email: true}
    }
}
const mobileNumberValidator = (control: FormControl) => {
    if (!control.value || control.value.match(mobileNumber)) {
        return null;
    } else {
        return {invalid: true, mobileNumber: true}
    }
}

export {
    alphanumericValidator,
    alphabetValidator,
    emailValidator,
    mobileNumberValidator
}