import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {  }

  login = true;

  goToRegister(): void {
    this.login = false;
  }

  goToLogin(): void {
    this.login = true;
  }

}
