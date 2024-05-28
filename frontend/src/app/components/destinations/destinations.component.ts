import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Destination } from 'src/app/interfaces/Destination';
import { User } from 'src/app/interfaces/User';
import { DestinationService } from 'src/app/services/destination.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/interfaces/Reservation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  destinations:Destination[] = []
  offers:Destination[] = []
  constructor(private route: ActivatedRoute,public sessionService:SessionStorageService,private destiantionService:DestinationService,
    private router:Router,public dialog:MatDialog, private reservationService:ReservationService) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      const location = params['location']
      if(location=='all'){
        this.destiantionService.getAll().subscribe(res =>{
          this.destinations = res.filter(dest => dest.offer==0);
          this.offers = res.filter(dest => dest.offer!=0);
        }
        )
      }
      else {
        this.destiantionService.getFilteredDestinations(location).subscribe(res => {
          this.destinations = res.filter(dest => dest.offer==0);
          this.offers = res.filter(dest => dest.offer!=0);
          })
      }
    })
    this.route.fragment.subscribe(fragment => {
      console.log('Received fragment:', fragment);
      if (fragment) {
        const element = document.getElementById(fragment);
        console.log('Element:', element);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }
    });
  }

  getRole():String{
    let user:User = this.sessionService.getItem('currUser');
    if(user==null){
      return "";
    }
    else{
      return user.role;
    }
  }

  navigateToCreate(){
    this.router.navigate(['create']);
  }

  deleteDestination(id:number){
    this.destiantionService.delete(id);
    console.log("in delete")
    this.refresh();
  }

  refresh(){
    this.destiantionService.getAll().subscribe(res =>{
      this.destinations = res.filter(dest => dest.offer==0);
      this.offers = res.filter(dest => dest.offer!=0);
  }
  )
  }

  editDestination(destination:Destination){
    const dialogRef = this.dialog.open(EditFormComponent,{
      data : {id: destination.id,title:destination.title,description:destination.description,location:destination.location,
        pricePerNight:destination.pricePerNight,freeRooms:destination.freeRooms,offer:destination.offer,imageUrl:destination.imageUrl},
    })

    dialogRef.afterClosed().subscribe(res => {
      this.refresh();
    });
    this.refresh();
  }

  availableDestinations(){
    console.log(this.startDate)
    console.log(this.endDate)
    this.refresh()
    this.reservationService.disponibiltyVerification(this.startDate,this.endDate).subscribe(res => {
      console.log(res);
      res.forEach(reservation => {
        const destinationMatch = this.destinations.find(destination => destination.id === reservation.destination);
        if (destinationMatch) {
          destinationMatch.freeRooms = destinationMatch.freeRooms-1;
        } 
      });
      res.forEach(reservation => {
        const destinationMatch = this.offers.find(destination => destination.id === reservation.destination);
        if (destinationMatch) {
          destinationMatch.freeRooms = destinationMatch.freeRooms-1;
        } 
      });
    })
  }

  makeReservation(destination:Destination){
      const noNights  = Math.floor((this.endDate.getTime() - this.startDate.getTime()) / 1000 / 60 / 60 / 24)+1;
      const totalPrice = (destination.pricePerNight - destination.pricePerNight*(destination.offer/100))*noNights;
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
      const formattedStartDate = datePipe.transform(this.startDate, 'yyyy-MM-dd');
      const formattedEndDate = datePipe.transform(this.endDate, 'yyyy-MM-dd');
      if(formattedDate && formattedStartDate && formattedEndDate){
        const reservation:Reservation = {id:0,destination:destination.id,client:this.sessionService.getUserID(),
                                        reservationDate: formattedDate,startDate:formattedStartDate, endDate:formattedEndDate,
                                        noNights:noNights,totalPrice:totalPrice};
        this.reservationService.create(reservation);
      }
     
  }

  viewReservations(destinationID:number){
    this.router.navigate(['/reservation/', destinationID]);
  }




}
