import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  rider = 'rider';
  customer = 'customer';
  fds = 'fds';
  restaurant = 'restaurant';


  constructor() {
  }

  login(username: string, password: string): string {
    if (username == this.rider && password == this.rider) {
      return this.rider;
    } else if (username == this.customer && password == this.customer) {
      return this.customer;
    } else if (username == this.fds && password == this.fds) {
      return this.fds;
    } else if (username == this.restaurant && password == this.restaurant) {
      return this.restaurant;
    } else {
      alert("Invalid credentials");
    }
  }
}
