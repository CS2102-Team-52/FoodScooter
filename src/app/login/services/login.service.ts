import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AccountDetails } from "./dto/account-details";
import { Util } from "../../users/util";
import { Credentials } from "./dto/credentials";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private httpClient: HttpClient
  ) { }

  login(credentials: Credentials) {
    return this.httpClient.post(`${Util.baseURL}/login/existing`, credentials);
  }

  createAccount(accountDetails: AccountDetails) {
    return this.httpClient.post(`${Util.baseURL}/login/new`, accountDetails);
  }

  getRestaurants() {
    return this.httpClient.get(`${Util.baseURL}/restaurants`)
  }
}
