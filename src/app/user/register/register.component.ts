import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  showAlert = false;
  alertMessage = 'Account is created';
  color = 'blue';
  inSubmission = false

  constructor(private auth: AngularFireAuth) {}

  registerForm = new FormGroup({
    // FormGroup is a container to a form whereas formcontrol is a to handle single field
    name: new FormControl('', [Validators.required, Validators.minLength(3)]), //accept a defaul value for the field it is handling and validators array
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
      ),
    ]),
    confirm_password: new FormControl(''),
    age: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(120),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.min(13),
      Validators.max(13),
    ]),
  });

  async register() {
    this.showAlert = true;
    this.alertMessage = 'Please wait. Your account is being created';
    this.color = 'blue';
    this.inSubmission = true

    const { email, password } = this.registerForm.value;

    try {
      const userCreated = await this.auth.createUserWithEmailAndPassword(
        email as string,
        password as string
      );
      console.log(userCreated);
    } catch (e) {
      this.alertMessage =
        'An unexpected error occurred. Please try again later';
      this.color = 'red';
      this.inSubmission = false
      return; //to prevent code outside catch block from running
    }

    this.alertMessage = 'Success! Your account has been created';
    this.color = 'green';
  }
}
