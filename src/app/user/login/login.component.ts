import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMessage = 'Account is created';
  color = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async login() {
    this.showAlert = true;
    this.alertMessage = 'Please wait. Your account is being logged in';
    this.color = 'blue';
    this.inSubmission = true;

    console.log(this.credentials);
    try {
      const { email, password } = this.credentials;
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.alertMessage =
        'An unexpected error occurred. Please try again later';
      this.color = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMessage = 'Success! Your account has been logged in';
    this.color = 'green';
  }
}
