import {Injectable} from '@angular/core';
import { User } from 'src/app/users/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private rider = 'rider';
  private customer = 'customer';
  private fds = 'fds';
  private restaurant = 'restaurant';
  private username: string;
  private password: string;


  constructor() {
  }

  login(username: string, password: string): string {
    this.username = username;
    this.password = password;
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

  getUser() {
    const user: User = {
      id: null,
      username: this.username,
      password: this.password
    }
    return user;
  }
}
