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

  login(username: string, password: string) {
    const credentials: Credentials = {
      username: username,
      password: password
    };
    return this.httpClient.post(`${Util.baseURL}/login/existing`, credentials);
  }

  createAccount(username: string, password: string, userType: UserType, riderType: RiderType) {
    const accountDetails: AccountDetails = {
      username: username,
      password: password,
      userType: userType,
      riderType: riderType
    };
    return this.httpClient.post(`${Util.baseURL}/login/new`, accountDetails);
  }

  setLoginResponse(loginResponse: LoginResponse) {
    console.log(loginResponse);
    this.loginResponse = loginResponse;
  }

  getLoginResponse() {
    return this.loginResponse;
  }
}
