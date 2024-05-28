import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { Geolocation } from '../interfaces/Geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {


  constructor(private sessionsService:SessionStorageService) { }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
         let  currLocation:Geolocation = {
           latitude:  position.coords.latitude,
           longitude: position.coords.longitude,
           accuracy: position.coords.accuracy
         }
          console.log('Latitude:', currLocation.latitude);
          console.log('Longitude:', currLocation.longitude);
          console.log('Accuracy:', currLocation.accuracy);
          this.sessionsService.setItem('geolocation',currLocation)
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
