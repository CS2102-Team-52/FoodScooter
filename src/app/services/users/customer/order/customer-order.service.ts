import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Util } from "../../../../users/util";
import { Order } from "../../../../store/order";
import { FoodItem } from "../../../../store/food-item";

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
  private foodItems: FoodItem[];

  constructor(
    private httpClient: HttpClient,
  ) { }

  public addFoodItem(foodItemId: number) {
    const foodItem: FoodItem = {
      id: foodItemId,
      name: '',
      category: '',
      price: -1,
      dailyLimit: -1
    };
    this.foodItems.push(foodItem);
  }

  public placeOrder(customerId: number, order: Order) {
    return this.httpClient.post(`${Util.baseURL}/customers/${customerId}/orders`, order);
  }

  public fetchOrders(customerId: number) {
    return this.httpClient.get(`${Util.baseURL}/customers/${customerId}/orders`);
  }

  public deleteOrder(orderId: number) {
    return this.httpClient.delete(`${Util.baseURL}/orders/${orderId}`);
  }
}