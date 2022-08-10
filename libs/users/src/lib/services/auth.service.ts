import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLUsers = environment.apiUrl + 'users';
  constructor(
    private http: HttpClient,
    private token:LocalstorageService,
    private router:Router
  ) { }
  login(email:string,password:string):Observable<User>{
    return this.http.post<User>(`${this.apiURLUsers}/login`,{email,password});
  }
  logout(){
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
