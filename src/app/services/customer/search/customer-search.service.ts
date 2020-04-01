import { Injectable } from '@angular/core';
import { RestaurantService } from "../../common/restaurant/restaurant.service";

/**
 * Provides services to:
 * 1. search for restaurants
 * 2. browse food items offered by restaurants
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerSearchService {

  constructor(
    private restaurantService: RestaurantService
  ) { }

  public fetchFoodItems(restaurantId: number) {
    return this.restaurantService.fetchFoodItems(restaurantId);
  }
}
