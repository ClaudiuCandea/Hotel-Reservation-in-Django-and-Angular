import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../interfaces/Reservation';
import { Observable } from 'rxjs/internal/Observable';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8000/reservation/';
  constructor( private http:HttpClient) { }

  getReservetions(destinationID:number):Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiUrl}${destinationID}/`)
  }

  create(reservation:Reservation):void{
    this.http.post<any>(`${this.apiUrl}`,reservation).subscribe(res => {
      console.log(res);
    },
    error =>{
      if (error.status === 400) { 
        alert("bad request");
      }
     });
  }

  disponibiltyVerification(startDate:Date,endDate:Date):Observable<Reservation[]>{
    const datePipe = new DatePipe('en-US');
    const fstartDate = datePipe.transform(startDate, 'yyyy-MM-dd');
    const fendDate= datePipe.transform(endDate, 'yyyy-MM-dd');
    return this.http.get<Reservation[]>(`${this.apiUrl}${fstartDate}/${fendDate}/`)
  }
}
