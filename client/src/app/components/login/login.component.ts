import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  processingInfo = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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

      // Function to send login data to API
    this.authService.login(user).subscribe(data => {

      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
        this.processingInfo = false; // Enable submit button
        this.enableForm(); // Enable form for editting
      } else {
        this.messageClass = 'alert alert-success'; // Set bootstrap success class
        this.message = data.message; // Set success message
        // Function to store user's token in client local storage
        this.authService.storeUserData(data.token, data.user);
        // After 2 seconds, redirect to dashboard page
        setTimeout(() => {
          this.router.navigate(['/dashboard']); // Navigate to dashboard view
        }, 1500);
      }
    });
  }

  ngOnInit() {
  }

}
