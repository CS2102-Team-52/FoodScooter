import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Util } from "../../../users/util";
import { Order } from "../../../store/order";
import { Customer } from "../../../users/customer/customer";
import { Observable } from "rxjs";

/**
 * Provides services to:
 * 1. place an order
 * 2. view ongoing or past orders
 * 3. delete an order
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  constructor(private httpClient: HttpClient) { }

  public placeOrder(customerId: number, order: Order) {
    return this.httpClient.post(`${Util.baseURL}/customers/${customerId}/orders`, order);
  }

  public fetchOrders(customerId: number) {
    return this.httpClient.get(`${Util.baseURL}/customers/${customerId}/orders`);
  }

  public deleteOrder(customerId: number, orderId: number) {
    return this.httpClient.delete(`${Util.baseURL}/customers/${customerId}/orders/${orderId}`);
  }
}
