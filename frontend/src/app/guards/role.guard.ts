import { CanActivateFn, Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';
import { inject } from '@angular/core';
import { User } from '../interfaces/User';

export const roleGuard: CanActivateFn = (route, state) => {
  var sessionService = inject(SessionStorageService);
  var user:User = sessionService.getItem('currUser');
  if(user && user.role==='AGENT'){
    return true;
   } 
   else{
     inject(Router).navigate(['']);
     return false;
   }
};
