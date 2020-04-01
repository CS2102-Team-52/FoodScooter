import { Injectable } from '@angular/core';
import { User } from 'src/app/users/user';
import { HttpClient } from "@angular/common/http";
import { Rider } from "../../users/rider/rider";
import { Customer } from "../../users/customer/customer";
import { CustomerService } from "../customer/customer.service";
import { RiderService } from "../rider/rider.service";

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

  private isFullTime: boolean;

  constructor(
    private httpClient: HttpClient,
    private riderService: RiderService,
    private customerService: CustomerService
  ) { }

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

  createUser(username: string, password: string, userType: string) {
    switch (userType) {
      case this.rider:
        const rider: Rider = {
          id: -1,
          username: this.username,
          password: this.password,
          isFullTime: true
        };
        this.riderService.addRider(rider);
        break;
      case this.customer:
        const customer: Customer = {
          id: -1,
          username: this.username,
          password: this.password,
          creditCardNumber: '',
          rewardPoints: 0,
          recentPlaces: []
        };
        this.customerService.addCustomer(customer);
        break;
      case this.fds:
        break;
      case this.restaurant:
        break;
      default:
        // will not reach here
    }
  }

  getUser() {
    const user: User = {
      id: -1,
      username: this.username,
      password: this.password
    };
    return user;
  }
}
