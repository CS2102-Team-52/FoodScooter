import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Util } from "../../../users/util";

/**
 * Provides services to:
 * 1. fetch all restaurants
 */
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  public fetchRestaurants() {
    return this.httpClient.get(`${Util.baseURL}/restaurants`)
  }

  public fetchFoodItems(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/restaurants/${restaurantId}/menu`);
  }
}
