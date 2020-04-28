import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Util } from "../../../users/util";
import { CustomerOrderDetails } from './dto/customer-order-details';

/**
 * Provides services to:
 * 1. fetch all restaurants
 */
@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getCustomerOrderOptions(customerId: number) {
    return this.httpClient.get(`${Util.baseURL}/customers/${customerId}/order-options`);
  }

  public fetchRestaurants() {
    return this.httpClient.get(`${Util.baseURL}/restaurants`)
  }

  public fetchFoodItems(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/restaurants/${restaurantId}/menu`);
  }

  public placeOrder(customerId: number, order: CustomerOrderDetails) {
    return this.httpClient.post(`${Util.baseURL}/orders`, order);
  }

  public fetchReviews(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/restaurants/${restaurantId}/reviews`);
  }
}
