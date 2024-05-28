import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/interfaces/Reservation';
import Chart from 'chart.js/auto'
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent implements OnInit{
    
    reservations:Reservation[]=[];
    destinationID:number = 0;
    public chart?: Chart;

    constructor(private route: ActivatedRoute, private reservationService:ReservationService){

    }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id')
        if(id!=null){
          this.destinationID = +id;
          this.loadReservations();
        }
      });
    }

    loadReservations(): void {
      this.reservationService.getReservetions(this.destinationID)
        .subscribe(reservations => {
          this.reservations = reservations;
          this.createChart();
        });
    }

    private countReservationsByMonth(reservations: Reservation[]): number[] {
      const reservationsCount = new Array(12).fill(0);
  
      reservations.forEach(reservation => {
        const startDate = new Date(reservation.startDate);
        const monthIndex = startDate.getMonth();
        reservationsCount[monthIndex]++;
      });
  
      return reservationsCount;
    }

    createChart(){
      const labels: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
      const dataset: any[] = this.countReservationsByMonth(this.reservations)
      console.log(dataset);
      this.chart = new Chart("MyChart", {
        type: 'bar', //this denotes tha type of chart
  
        data: {// values on X-Axis
          labels: labels , 
           datasets: [
            {
              label: "Number of Reservations",
              data: dataset,
              backgroundColor: 'blue'
            },
          ]
        },
        options: {
          aspectRatio:2.5,
          scales: {
            y: {
              title: {
                display: true
              }
            },
            x:{
              title: {
                display: true
              }
            }
          }   
        }
        
      });
    }
}
