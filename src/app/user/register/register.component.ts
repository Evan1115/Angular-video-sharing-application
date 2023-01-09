import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  showAlert = false;
  alertMessage = 'Account is created';
  color = 'blue';

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

  register() {
    this.showAlert = true;
    this.alertMessage = 'Account is created';
    this.color = 'blue';
  }
}
