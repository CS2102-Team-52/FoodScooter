import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../../../users/util';

@Injectable({
  providedIn: 'root'
})
export class RiderOrderService {

  constructor(private httpClient: HttpClient) {
  }

  public fetchPartTimeOrders() {
    return this.httpClient.get(`${Util.baseURL}/rider/partTimeOrders`);
  }

  public fetchFullTimeOrders() {
    return this.httpClient.get(`${Util.baseURL}/rider/fullTimeOrders`);
  }

  public fetchRiderSummary() {
    return this.httpClient.get(`${Util.baseURL}/rider/riderSummary`);
  }
}
