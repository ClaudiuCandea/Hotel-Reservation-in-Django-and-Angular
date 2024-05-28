import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DestinationService } from 'src/app/services/destination.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  searchedLocation:string="";

  constructor(private router:Router,private elRef: ElementRef,private sessionService:SessionStorageService,private destinationService:DestinationService){
  }

  toHome(){
    this.router.navigate(['']);
  }

  toContacts(){
    this.router.navigate(['contacts']);
  }

  logOut(){
    this.sessionService.clear();
    this.router.navigate(['login']);
  }

  toDestinations(){
    this.router.navigate(['destinations','all']);
  }

  toOffers(){
    this.router.navigate(['destinations','all'], { fragment: 'offers-section' });
  }

  searchDestination(){
      this.router.navigate(['destinations/',this.searchedLocation]);
  }

  
}
