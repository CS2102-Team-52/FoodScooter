import { Injectable } from '@angular/core';
import { User } from 'src/app/users/user';
import { HttpClient } from "@angular/common/http";
import { Rider } from "../../users/rider/rider";
import { Customer } from "../../users/customer/customer";
import { CustomerService } from "../users/customer/customer.service";
import { RiderService } from "../users/rider/rider.service";
import { AuthenticationService } from "./authentication/authentication.service";
import { UserType } from "../../store/user-type.enum";
import { RiderType } from "../../store/rider-type.enum";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService,
    private riderService: RiderService,
    private customerService: CustomerService
  ) { }

  login(username: string, password: string) {
    return this.authenticationService.authenticate(username, password);
  }

  createUser(username: string, password: string, userType: UserType, riderType: RiderType) {
    switch (userType) {
      case UserType.DELIVERY_RIDER:
        const rider: Rider = {
          id: -1,
          username: username,
          password: password,
          riderType: riderType
        };
        return this.riderService.addRider(rider);
      case UserType.CUSTOMER:
        const customer: Customer = {
          id: -1,
          username: username,
          password: password,
          creditCardNumber: '',
          rewardPoints: 0,
          recentPlaces: []
        };
        return this.customerService.addCustomer(customer);
      case UserType.RESTAURANT_STAFF:
        break;
      case UserType.FDS_MANAGER:
        break;
      default:
        // will not reach here
    }
  }

  //TODO
  getUser() {
    const user: User = {
      id: -1,
      username: "username",
      password: "password"
    };
    return user;
  }
}
