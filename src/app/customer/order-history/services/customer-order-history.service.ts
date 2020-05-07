import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Util } from "../../../users/util";
import { CustomerOrderFeedback } from "./dtos/customer-order-feedback";

/**
 * Provides services to:
 * 1. rate a rider after an order is delivered
 * 2. review food items after an order is delivered
 * 3. view other reviews of food items
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerOrderHistoryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public fetchOrders(customerId: number) {
    return this.httpClient.get(`${Util.baseURL}/customers/${customerId}/orders`);
  }

  public fetchOrderStatuses(customerId: number) {
    return this.httpClient.get(`${Util.baseURL}/customers/${customerId}/order-statuses`)
  }

  public deleteOrder(orderId: number) {
    return this.httpClient.delete(`${Util.baseURL}/orders/${orderId}`);
  }

  public submitFeedback(feedback: CustomerOrderFeedback) {
    return this.httpClient.post(`${Util.baseURL}/feedback`, feedback);
  }
}
