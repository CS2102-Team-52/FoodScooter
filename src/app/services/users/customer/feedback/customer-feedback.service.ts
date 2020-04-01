import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Util } from "../../../../users/util";
import { FeedbackService } from "../../../common/feedback/feedback.service";
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
    private feedbackService: FeedbackService
  ) { }

  public rateRider(riderId: number, rating: number) {
    return this.feedbackService.rateRider(riderId, rating);
  }

  public reviewFoodItem(review: Review) {
    return this.feedbackService.reviewFoodItem(review);
  }

  public fetchReviews(restaurantId: number, foodItemId: number) {
    return this.feedbackService.fetchReviews(restaurantId, foodItemId);
  }
}
