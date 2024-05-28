import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';
import { Observable } from 'rxjs';
import { Destination } from '../interfaces/Destination';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private apiUrl = 'http://localhost:8000/destination/';
  constructor( private http:HttpClient) { }

  getAll():Observable<Destination[]>{
    return this.http.get<Destination[]>(`${this.apiUrl}`);
  }

  getFilteredDestinations(location:string):Observable<Destination[]>{
    return this.http.get<Destination[]>(`${this.apiUrl}${location}/`)
  }

  create(destination:Destination):void{
    this.http.post<any>(`${this.apiUrl}`,destination).subscribe(res => {
      console.log(res);
    },
    error =>{
      if (error.status === 400) { 
        alert("bad request");
      }
     });
  }

  update(destination:Destination,id:number):void{
    this.http.put<any>(`${this.apiUrl}${id}/`,destination).subscribe(res => {
      console.log(res);
    },
    error =>{
      if (error.status === 400) { 
        alert("bad request");
      }
     });
  }

  delete(id:number):void{
    console.log(id)
    console.log(`${this.apiUrl}${id}/`)
    this.http.delete<any>(`${this.apiUrl}${id}/`).subscribe();
  }
}
