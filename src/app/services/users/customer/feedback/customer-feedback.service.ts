import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Util } from "../../../../users/util";
import { Review } from "../../../../store/review";

/**
 * Provides services to:
 * 1. rate a rider after an order is delivered
 * 2. review food items after an order is delivered
 * 3. view other reviews of food items
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerFeedbackService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public submitFeedback(review: Review) {
    return this.httpClient.post(`${Util.baseURL}/reviews/food-items/`, review);
  }

  public fetchReviews(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/restaurants/${restaurantId}/reviews`);
  }
}
