import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserType } from "../../store/user-type.enum";
import { RiderType } from "../../store/rider-type.enum";
import { AccountDetails } from "./dto/account-details";
import { Util } from "../../users/util";
import { Credentials } from "./dto/credentials";
import { LoginResponse } from './dto/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private httpClient: HttpClient
  ) { }

  private loginResponse: LoginResponse;

  login(credentials: Credentials) {
    return this.httpClient.post(`${Util.baseURL}/login/existing`, credentials);
  }

  createAccount(accountDetails: AccountDetails) {
    return this.httpClient.post(`${Util.baseURL}/login/new`, accountDetails);
  }

  setLoginResponse(loginResponse: LoginResponse) {
    this.loginResponse = loginResponse;
  }

  getLoginResponse() {
    return this.loginResponse;
  }
}
