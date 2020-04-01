import { Injectable } from '@angular/core';
import { Util } from "../../../users/util";
import { HttpClient } from "@angular/common/http";
import { Review } from "../../../store/review";

/**
 * Provides services to:
 * 1. rate a rider after an order is delivered
 * 2. add reviews for a food item of a restaurant after an order is delivered
 * 3. view all reviews for a food item of a restaurant

 */
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClient: HttpClient) { }

  public rateRider(riderId: number, rating: number) {
    return this.httpClient.post(`${Util.baseURL}/reviews/riders/${riderId}`, rating)
  }

  public reviewFoodItem(review: Review) {
    return this.httpClient.post(`${Util.baseURL}/reviews/food-items/`, review);
  }

  public fetchReviews(restaurantId: number, foodItemId: number) {
    return this.httpClient.get(`${Util.baseURL}/reviews/restaurants/${restaurantId}/food-items/${foodItemId}`)
  }
}
