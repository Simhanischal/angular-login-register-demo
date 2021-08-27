import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {  }

  login: boolean = true;

  //register section
  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get regControl(){
    return this.registerForm.controls;
  }

  onRegister(): void{
    if(!this.registerForm.valid)
      this.toastr.error('Please correct the issues in the form');
    else
    this.toastr.success('User registered successfully');
  }

  goToLogin(): void {
    this.login = true;
  }

  //login section
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get logControl(){
    return this.loginForm.controls;
  }

  onLogin(): void{
    if(!this.loginForm.valid)
      this.toastr.error('Please correct the issues in the form');
    else
    this.toastr.success('User logged in successfully');
  }

  goToRegister(): void {
    this.login = false;
  }

}
