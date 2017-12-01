import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm()
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        this.validateEmail
      ])],

      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        this.validateUsername
      ])],

      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirm: ['',Validators.required]
    },{validator: this.matchingPasswords('password', 'confirm')});
  }

  validateEmail(controls){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)){
      return null;
    }else{
      return {'validateEmail': true }
    }
  }

  validateUsername(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)){
      return null;
    }else{
      return {'validateUsername': true }
    }
  }

  validatePassword(controls){
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if (regExp.test(controls.value)){
      return null;
    }else{
      return {'validateUsername': true }
    }
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }

  onRegisterSubmit(){
    //this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
    //this.disableForm(); // Disable the form
    // Create user object form user's inputs
    const user = {
      email: this.form.get('email').value, // E-mail input field
      username: this.form.get('username').value, // Username input field
      password: this.form.get('password').value // Password input field
    }

    this.authService.registerUser(user).subscribe(data => {
    if (!data.success) {
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
    }else{
      this.messageClass = 'alert alert-success';
      this.message = data.message;
    }
    });

  }

  ngOnInit() {
  }

}
