import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../../../users/util';
import { ActivatedRoute } from '@angular/router';
import { CustomerProfile } from '../customer-profile';
import { Customer } from '../../customer';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) { }

  public getDetails(customerId: number) {
    return this.httpClient.get(`${Util.baseURL}/customers/${customerId}`);
  }

  public putDetails(customerId: number, customerProfile: CustomerProfile) {
    return this.httpClient.put(`${Util.baseURL}/customers/${customerId}`, customerProfile)
  }
}
