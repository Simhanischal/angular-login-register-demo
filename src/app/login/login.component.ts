import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
import { LoginService } from '../services/login.service';
import { User } from '../interfaces/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private regService: RegisterService,
    private logService: LoginService,
    private toastr: ToastrService,
  ) { }

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
    else{
      this.regService.addUser({
          id: uuidv4(),
          username: this.regControl.username?.value,
          email: this.regControl.email?.value,
          password: this.regControl.password?.value,
        }).subscribe({
          next: user => {
            this.toastr.success(`Success ${user.username}, welcome to Angular`);
            this.toastr.success(`Please login to get started`);
            //clear input fields
            this.registerForm.reset();
            this.goToLogin();
          },
          error: err => this.toastr.error('OOps, something went wrong! Please try again.')
        });
    }
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

  validateUser(user: User): boolean{
    if(user.password === this.logControl.password?.value){
      return true;
    }
    else return false;
  }

  onLogin(): void{
    if(!this.loginForm.valid)
      this.toastr.error('Please correct the issues in the form');
    else{
      this.logService.getUserByEmail(this.logControl.email?.value)
      .subscribe({
        next: user => {
          console.log(user[0]);
          if(!user.length) this.toastr.error('Invalid email, please try again');
          else if(this.validateUser(user[0])){
            this.toastr.success('Log in success');
            //clear input fields
            this.loginForm.reset();
          }
          else if(!this.validateUser(user[0])) this.toastr.warning('Incorrect Password, please try again');
        },
        error: err => this.toastr.error('OOps! Something went wrong, please try later'),
      });      
    }
  }

  goToRegister(): void {
    this.login = false;
  }

  googleAuth(event: Event){
    event.preventDefault();
    this.toastr.warning(`Sorry, Google authentication is unavaiable at the moment. 
                         Please use the above form instead`);
  }

  fbAuth(event: Event){
    event.preventDefault();
    this.toastr.warning(`Sorry, Facebook authentication is unavaiable at the moment. 
                         Please use the above form instead`);
  }

}
