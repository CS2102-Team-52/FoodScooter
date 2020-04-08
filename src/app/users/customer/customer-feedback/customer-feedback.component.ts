import { Component, Input, OnInit } from '@angular/core';
import { CustomerFeedbackService } from "../../../services/users/customer/feedback/customer-feedback.service";
import { Review } from "../../../store/review";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.css']
})
export class CustomerFeedbackComponent implements OnInit {
  ratings: number[];

  ratingz: number;
  content: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerFeedbackService: CustomerFeedbackService
  ) {
    this.ratings = [1, 2, 3, 4, 5];
  }

  ngOnInit(): void {
  }

  public submitReview() {
    const review: Review = {
      id: -1,
      restaurantId: 1,
      orderId: 1,
      rating: this.ratingz,
      content: this.content
    };
    this.customerFeedbackService.reviewFoodItem(review)
  }
}
