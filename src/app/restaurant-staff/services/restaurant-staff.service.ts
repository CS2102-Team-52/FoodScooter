import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../../users/util';
import { FoodItem } from '../../customer/restaurants/restaurant/food-item';

@Injectable({
  providedIn: 'root'
})
export class RestaurantStaffService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public fetchMenu(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/restaurants/${restaurantId}/menu`);
  }

  public getEmployingRestaurant(staffId: number) {
    return this.httpClient.get(`${Util.baseURL}/staff/${staffId}/restaurant`);
  }

  public addFoodItems(restaurantId: number, foodItem: FoodItem) {
    return this.httpClient.put(`${Util.baseURL}/restaurants/${restaurantId}/menu`, foodItem);
  }

  public updateFoodItem(restaurantId: number, foodItem: FoodItem) {
    return this.httpClient.patch(`${Util.baseURL}/restaurants/${restaurantId}/menu/${foodItem.id}`, foodItem);
  }

  public removeFoodItems(restaurantId: number, foodItemIds: number[]) {
    return this.httpClient.post(`${Util.baseURL}/restaurants/${restaurantId}/menu/batch-removal`, foodItemIds);
  }

  public fetchRestaurantSummary(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/staff/${restaurantId}/restaurantSummary`);
  }

  public fetchPromotionSummary(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/staff/${restaurantId}/promotionSummary`);
  }
}
