import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { UserType } from '../store/user-type.enum';
import { RiderType } from '../store/rider-type.enum';
import { LoginResponse } from './services/dto/login-response';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountDetails } from './services/dto/account-details';
import { Credentials } from './services/dto/credentials';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private path: string;

  toShowRiderTypeInput: boolean;

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  accountCreationForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    userType: ['', Validators.required],
    riderType: ['']
  })

  userTypes: string[];
  riderTypes: string[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.toShowRiderTypeInput = false;
    this.userTypes = Object.keys(UserType);
    this.riderTypes = Object.keys(RiderType);
  }

  ngOnInit(): void {
  }

  checkIfRequireRiderType(): void {
    const isDeliveryRider = UserType[this.accountCreationForm.get('userType').value] == UserType.DELIVERY_RIDER;
    if (isDeliveryRider) {
      this.accountCreationForm.get('riderType').setValidators([Validators.required]);
      this.toShowRiderTypeInput = true;
    } else {
      this.accountCreationForm.get('riderType').setValidators(null);
      this.toShowRiderTypeInput = false;
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
      riderType: this.accountCreationForm.get('riderType').value == '' ? undefined : this.accountCreationForm.get('riderType').value
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
    }
    this.loginService.setLoginResponse(response);
    this.path = `${type}/${response.userId}`;
    this.router.navigate([this.path]).then(() => {});
  }
}
