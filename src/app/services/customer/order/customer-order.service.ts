import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Util } from "../../../users/util";

/**
 * Provides services to:
 * 1. place an order
 * 2. view orders
 * 3. delete an order
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  constructor(private httpClient: HttpClient) { }

  public placeOrder() {
    return this.httpClient.post(`${Util.baseURL}/customer/order`, order);
  }

  public viewOrders() {
    return this.httpClient.get(`${Util.baseURL}/customer/order`);
  }

  public deleteOrder() {
    return this.httpClient.delete(`${Util.baseURL}/customer/order/${orderId}`);
  }
}
