import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Util } from "../../../users/util";
import { Feedback } from "../order-feedback/feedback";

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

  public submitFeedback(feedback: Feedback) {
    console.log("sent");
    return this.httpClient.post(`${Util.baseURL}/feedback`, feedback);
  }

  public fetchReviews(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/restaurants/${restaurantId}/reviews`);
  }
}
