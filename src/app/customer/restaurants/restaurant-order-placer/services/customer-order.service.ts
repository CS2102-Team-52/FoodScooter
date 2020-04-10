import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Util } from "../../../../users/util";
import { CustomerOrderDetails } from "./dto/customer-order-details";

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
  constructor(
    private httpClient: HttpClient,
  ) { }

  public placeOrder(customerId: number, order: CustomerOrderDetails) {
    return this.httpClient.post(`${Util.baseURL}/customers/${customerId}/orders`, order);
  }

  public fetchOrders(customerId: number) {
    return this.httpClient.get(`${Util.baseURL}/customers/${customerId}/orders`);
  }

  public deleteOrder(orderId: number) {
    return this.httpClient.delete(`${Util.baseURL}/orders/${orderId}`);
  }
}
