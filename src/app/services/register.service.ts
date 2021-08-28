import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl: string = 'http://localhost:3000/users';
  user: User[] = [];
  constructor(private http: HttpClient) { }

  addUser(body: User): Observable<any>{
    return this.http.post(this.baseUrl, body);
  }
}
