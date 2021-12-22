import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidator {
    static passwordMatching(control: AbstractControl): ValidationErrors | null {
        //the abstract controller hep as to get the data 
        const password = control.get('password')?.value;
        const conformPassword = control.get('conformPassword')?.value;

        if((password === conformPassword) && (password !== null && conformPassword !== null)) {
            return null;
        } else {
            return {passwordsNotMatching: true};
        }
    }
}