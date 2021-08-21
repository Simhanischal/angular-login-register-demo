import { Component, OnInit } from '@angular/core';
import { faArrowRight, } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {  }

  login = true;
  faArrowRight = faArrowRight;

  goToRegister(): void {
    this.login = false;
  }

  goToLogin(): void {
    this.login = true;
  }

}
