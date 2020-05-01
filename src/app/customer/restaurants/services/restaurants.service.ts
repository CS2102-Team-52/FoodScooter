import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Util } from "../../../users/util";
import { CustomerOrder } from './dto/customer-order';
import { FoodItem } from '../restaurant/food-item';

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

  public placeOrder(foodItemsInOrder: FoodItem[], customerOrder: CustomerOrder) {
    const order = RestaurantsService.constructOrder(foodItemsInOrder, customerOrder)
    return this.httpClient.post(`${Util.baseURL}/orders`, order);
  }

  private static constructOrder(foodItemsInOrder: FoodItem[], customerOrder: CustomerOrder) {
    const totalFoodCost = RestaurantsService.computeTotalFoodCost(foodItemsInOrder);
    const items = RestaurantsService.consolidateFoodItems(foodItemsInOrder);

    customerOrder.foodCost = totalFoodCost;
    customerOrder.foodItems = Array.from(items.keys());
    customerOrder.quantity = Array.from(items.values());

    console.log(customerOrder);
    return customerOrder;
  }

  private static computeTotalFoodCost(foodItemsInOrder: FoodItem[]) {
    let totalCost = 0;
    for (const foodItem of foodItemsInOrder) {
      totalCost += foodItem.price;
    }
    return totalCost;
  }

  private static consolidateFoodItems(foodItemsInOrder: FoodItem[]) {
    const items = new Map();
    for (const foodItem of foodItemsInOrder) {
      if (items.has(foodItem.id)) {
        const count = items.get(foodItem.id);
        items.set(foodItem.id, count + 1);
      } else {
        items.set(foodItem.id, 1);
      }
    }
    return items;
  }

  public fetchReviews(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/restaurants/${restaurantId}/reviews`);
  }
}
