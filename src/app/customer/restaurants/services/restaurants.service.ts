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

  public fetchRestaurant(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/restaurants/${restaurantId}`);
  }

  public fetchFoodItems(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/restaurants/${restaurantId}/menu`);
  }

  public placeOrder(foodItemsOrdered: Map<FoodItem, number>, customerOrder: CustomerOrder) {
    const order = this.constructOrder(foodItemsOrdered, customerOrder)
    return this.httpClient.post(`${Util.baseURL}/orders`, order);
  }

  private constructOrder(foodItemsOrdered: Map<FoodItem, number>, customerOrder: CustomerOrder) {
    customerOrder.foodCost = this.computeFoodCost(foodItemsOrdered);

    let formattedFoodItems: number[] = [];
    for (const foodItem of foodItemsOrdered.keys()) {
      formattedFoodItems.push(foodItem.id);
    }
    customerOrder.foodItems = formattedFoodItems;
    customerOrder.quantity = Array.from(foodItemsOrdered.values());

    console.log(customerOrder);
    return customerOrder;
  }

  public computeFoodCost(foodItemsOrdered: Map<FoodItem, number>) {
    let totalCost = 0;
    for (const foodItem of foodItemsOrdered.keys()) {
      totalCost += foodItemsOrdered.get(foodItem) * foodItem.price;
    }
    return totalCost;
  }

  public applyPriceReductions(totalCost: number, rewardPointsUsed: number, discountApplied: number) {
    totalCost -= rewardPointsUsed;
    if (totalCost < 0) {
      totalCost = 0;
    }
    if (discountApplied == 0) {
      return totalCost;
    } else {
      return totalCost * (100 - discountApplied) / 100;
    }
  }

  public fetchReviews(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/restaurants/${restaurantId}/reviews`);
  }
}
