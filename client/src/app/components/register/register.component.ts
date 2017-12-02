import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  processingInfo = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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

  // Function to disable the registration form
disableForm() {
  this.form.controls['email'].disable();
  this.form.controls['username'].disable();
  this.form.controls['password'].disable();
  this.form.controls['confirm'].disable();
}

// Function to enable the registration form
enableForm() {
  this.form.controls['email'].enable();
  this.form.controls['username'].enable();
  this.form.controls['password'].enable();
  this.form.controls['confirm'].enable();
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
    this.processingInfo = true; // Used to notify HTML that form is in processing, so that it can be disabled
    this.disableForm(); // Disable the form
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
      this.processingInfo = false;
      this.enableForm();
    }else{
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      setTimeout(() => {
          this.router.navigate(['/home']); // Go to login page
        }, 1500);
      }
    });
  }

// Used to check availability of email
  checkEmail() {
  this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
    if (!data.success) {
      this.emailValid = false;
      this.emailMessage = data.message;
    } else {
      this.emailValid = true;
      this.emailMessage = data.message;
    }
  });
}

// Used to check availability of username
checkUsername() {
  this.authService.checkUsername(this.form.get('username').value).subscribe(data => {
    // Check if success true or success false was returned from API
    if (!data.success) {
      this.usernameValid = false; // Return username as invalid
      this.usernameMessage = data.message; // Return error message
    } else {
      this.usernameValid = true; // Return username as valid
      this.usernameMessage = data.message; // Return success message
    }
  });
}


  ngOnInit() {
  }

}
