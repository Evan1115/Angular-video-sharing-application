import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  registerForm = new FormGroup({ // FormGroup is a container to a form whereas formcontrol is a to handle single field
    name : new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]), //accept a defaul value for the field it is handling and validators array
    email: new FormControl(""),
    password: new FormControl(""),
    confirm_password: new FormControl(""),
    age: new FormControl(""),
    phoneNumber: new FormControl(""),
  })

}
