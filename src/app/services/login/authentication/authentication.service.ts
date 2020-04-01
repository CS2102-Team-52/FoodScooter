import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Util } from "../../../users/util";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public authenticate(username: string, password: string) {
    return this.httpClient.get(`${Util.baseURL}/auth`);
  }
}
