import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  showAlert = false;
  alertMessage = 'Account is created';
  color = 'blue';
  inSubmission = false;

  constructor(
    private authService: AuthService,
    private emailTaken: EmailTaken
  ) {}

  registerForm = new FormGroup(
    {
      // FormGroup is a container to a form whereas formcontrol is a to handle single field
      name: new FormControl('', [Validators.required, Validators.minLength(3)]), //accept a defaul value for the field it is handling and validators array
      email: new FormControl('', [Validators.required, Validators.email], [this.emailTaken.validate]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
        ),
      ]),
      confirm_password: new FormControl(''),
      age: new FormControl<Number | null>(null, [
        Validators.required,
        Validators.min(18),
        Validators.max(120),
      ]), //dynamic type (number or null)
      phoneNumber: new FormControl('', [
        Validators.required, //a reference to Validators.required function
        Validators.min(13), //factory function where min() will return a validator function
        Validators.max(13),
      ]), // string or null by default
    },
    [RegisterValidators.match('password', 'confirm_password')]
  );

  async register() {
    this.showAlert = true;
    this.alertMessage = 'Please wait. Your account is being created';
    this.color = 'blue';
    this.inSubmission = true;

    try {
      await this.authService.createUser(this.registerForm.value as IUser);
    } catch (e) {
      this.alertMessage =
        'An unexpected error occurred. Please try again later';
      this.color = 'red';
      this.inSubmission = false;
      return; //to prevent code outside catch block from running
    }

    this.alertMessage = 'Success! Your account has been created';
    this.color = 'green';
  }
}
