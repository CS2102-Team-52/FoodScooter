import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { UserType } from '../store/user-type.enum';
import { RiderType } from '../store/rider-type.enum';
import { LoginResponse } from './services/dto/login-response';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountDetails } from './services/dto/account-details';
import { Credentials } from './services/dto/credentials';
import { Restaurant } from '../store/restaurant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private path: string;

  toShowRiderTypeInputField: boolean;
  toShowRestaurantInputField: boolean;

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  accountCreationForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    userType: ['', Validators.required],
    riderType: [''],
    restaurant: ['']
  });

  userTypes: string[];
  riderTypes: string[];
  restaurants: Restaurant[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.toShowRiderTypeInputField = false;
    this.toShowRestaurantInputField = false;
    this.userTypes = Object.keys(UserType);
    this.riderTypes = Object.keys(RiderType);
  }

  ngOnInit(): void {
    this.loginService.getRestaurants().subscribe(
      (data: Restaurant[]) => {
        console.log(data);
        this.restaurants = data;
      }
    );
  }

  checkIfRequireOtherInputOptions() {
    const userType: UserType = UserType[this.accountCreationForm.get('userType').value];
    switch (userType) {
      case UserType.DELIVERY_RIDER:
        this.accountCreationForm.get('restaurant').setValidators(null);
        this.toShowRestaurantInputField = false;

        this.accountCreationForm.get('riderType').setValidators([Validators.required]);
        this.toShowRiderTypeInputField = true;
        break;
      case UserType.RESTAURANT_STAFF:
        this.accountCreationForm.get('riderType').setValidators(null);
        this.toShowRiderTypeInputField = false;

        this.accountCreationForm.get('restaurant').setValidators([Validators.required]);
        this.toShowRestaurantInputField = true;
        break;
      default:
        this.accountCreationForm.get('riderType').setValidators(null);
        this.toShowRiderTypeInputField = false;

        this.accountCreationForm.get('restaurant').setValidators(null);
        this.toShowRestaurantInputField = false;
    }
  }

  login() {
    const credentials: Credentials = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };
    this.loginService.login(credentials).subscribe((data: LoginResponse) => {
      this.navigateToUserPage(data);
    });
  }

  createAccount() {
    const accountDetails: AccountDetails = {
      username: this.accountCreationForm.get('username').value,
      password: this.accountCreationForm.get('password').value,
      userType: this.accountCreationForm.get('userType').value,
      riderType: this.accountCreationForm.get('riderType').value == '' ? undefined : this.accountCreationForm.get('riderType').value,
      restaurant: this.accountCreationForm.get('restaurant').value == '' ? undefined : this.accountCreationForm.get('restaurant').value
    };
    console.log(accountDetails);
    this.loginService.createAccount(accountDetails).subscribe(
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
        type = 'managers';
        break;
      default:
      // do nothing
    }
    this.loginService.setLoginResponse(response);
    this.path = `${type}/${response.userId}`;
    this.router.navigate([this.path]).then(() => {
    });
  }
}
