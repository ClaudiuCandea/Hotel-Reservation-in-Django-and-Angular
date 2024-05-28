import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../interfaces/UserLogin';
import { SessionStorageService } from './session-storage.service';
import { UserRegister } from '../interfaces/UserRegister';
import { GeolocationService } from './geolocation.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000/user/';
  constructor( private http:HttpClient,private router:Router,private sessionService:SessionStorageService,
    private geolocationService:GeolocationService) { }

  getUser(userID:number):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}${userID}/`)
  }

  login(user:UserLogin):void{
    this.http.post<any>(`${this.apiUrl}login/`,user).subscribe(res => {
       this.sessionService.setItem('currUser',res);
       this.geolocationService.getLocation();
       this.router.navigate([""]);
    },
    error =>{
     if (error.status === 401) { 
       alert("Invalid email or password");
     }
    });
  }

  register(user:UserRegister):void{
    user.role='CLIENT'
    this.http.post<any>(`${this.apiUrl}`,user).subscribe(res => {
     this.sessionService.setItem('currUser',res);
     this.geolocationService.getLocation();
     this.router.navigate([""]);
  } );
  }

}
