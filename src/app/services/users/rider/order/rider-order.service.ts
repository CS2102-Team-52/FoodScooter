import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../../../../users/util';

@Injectable({
  providedIn: 'root'
})
export class RiderOrderService {

  constructor(private httpClient: HttpClient) {
  }

  public fetchPartTimeOrders(drid: number) {
    return this.httpClient.get(`${Util.baseURL}/rider/${drid}/partTimeOrders`);
  }

  public fetchFullTimeOrders(drid: number) {
    return this.httpClient.get(`${Util.baseURL}/rider/${drid}/fullTimeOrders`);
  }

  public fetchRiderSummary(drid: number) {
    return this.httpClient.get(`${Util.baseURL}/rider/${drid}/orderSummary`);
  }

  public acceptOrder(drid: number, orderId: number) {
    return this.httpClient.put(`${Util.baseURL}/rider/${drid}/acceptOrder/`, orderId);
  }

  public doneOrder(drid: number, orderId: number) {
    return this.httpClient.put(`${Util.baseURL}/rider/${drid}/doneOrder/`, orderId);
  }

  public fetchAcceptedOrders(drid: number) {
    return this.httpClient.get(`${Util.baseURL}/rider/${drid}/acceptedOrders/`);
  }

}
