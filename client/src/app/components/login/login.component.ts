import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messaageClass;
  message;
  processingInfo = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
   }

  createForm() {
  this.form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
}
  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

// Function to enable form
  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

  onLoginSubmit() {
  this.processingInfo = true;
  this.disableForm();

    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
      }
  }

  ngOnInit() {
  }

}