import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }

  getUserID():number {
    const item = sessionStorage.getItem("currUser");
    if(item){
      const user:User = JSON.parse(item);
      return user.id
    }
    return 0;
  }
}
