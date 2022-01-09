import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export const phoneValidator = (control: AbstractControl): ValidationErrors | null => {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasPhone = /^\(?\+([9]{2}?[6])\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(control.value);
    if (hasPhone) {
      return null;
    }
    return {phone: true};
  };
}

@Directive({
  selector: '[appPhone]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidatePhoneDirective,
    multi: true,
  }]
})
export class ValidatePhoneDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return phoneValidator(control);
  }
}
