import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RegisterValidators {
  //factory function
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchinControl = group.get(matchingControlName);

      if (!control || !matchinControl) {
        return { controlNotFound: true };
      }

      const error =
        control.value === matchinControl.value ? null : { noMatch: true };

      matchinControl.setErrors(error);

      return error;
    };
  }
}

//AbstractControl class is inherited by formGroup and formControl class
//group.get() will return the formControl within the formGroup
