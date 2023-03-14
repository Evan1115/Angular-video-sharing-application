import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

//class cannot be injected with other serivces by default, so we need to manually assign it with @Injectable
//so it let this class able to inject service as well as injected to other class a service
@Injectable({
  providedIn: 'root',
})
export class EmailTaken implements AsyncValidator {
  constructor(private auth: AngularFireAuth) {}

  validate = async (
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> => {
    const res = await this.auth.fetchSignInMethodsForEmail(control.value);
    return res.length ? { emailTaken: true } : null;
  };
}
