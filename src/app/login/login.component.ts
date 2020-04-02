import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../services/login/login.service";
import { UserType } from "../store/user-type.enum";
import { RiderType } from "../store/rider-type.enum";
import { LoginResponse } from "../services/login/login-response";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private path: string;

  username: string;
  password: string;

  userType: UserType;
  userTypes: string[];

  riderType: RiderType;
  riderTypes: string[];

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.userTypes = Object.keys(UserType);
    this.riderTypes = Object.keys(RiderType);
  }

  isDeliveryRider(): boolean {
    return UserType[this.userType] == UserType.DELIVERY_RIDER;
  }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      (data: LoginResponse) => {
        this.navigateToUserPage(data)
      }
    );
  }

  createAccount() {
    this.loginService.createAccount(this.username, this.password, this.userType, this.riderType).subscribe(
      (data: LoginResponse) => {
        this.navigateToUserPage(data);
      }
    );
  }

  private navigateToUserPage(response: LoginResponse) {
    if (!response.isAuthenticated) {
      return; // do nothing
    }
    let type;
    switch (UserType[response.userType]) {
      case UserType.DELIVERY_RIDER:
        type = 'riders';
        break;
      case UserType.CUSTOMER:
        type = 'customers';
        break;
      case UserType.RESTAURANT_STAFF:
        type = 'staff';
        break;
      case UserType.FOOD_SCOOTER_MANAGER:
        type = 'managers'
    }
    this.path = `${type}/${response.userId}`;
    this.router.navigate([this.path]).then(() => {});
  }
}
