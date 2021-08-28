import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // users: User[] = [];
  private baseUrl: string = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getUserByEmail(email: string): Observable<any>{
    return this.http.get(`${this.baseUrl}?email=${email}`);
  }


}
