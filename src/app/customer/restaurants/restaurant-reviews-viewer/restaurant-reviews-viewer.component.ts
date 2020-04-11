import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../../order-history/services/order-history.service';
import { ActivatedRoute } from '@angular/router';
import { FoodReview } from './food-review';

@Component({
  selector: 'app-restaurant-reviews-viewer',
  templateUrl: './restaurant-reviews-viewer.component.html',
  styleUrls: ['./restaurant-reviews-viewer.component.css']
})
export class RestaurantReviewsViewerComponent implements OnInit {
  foodReviews: FoodReview[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerFeedbackService: OrderHistoryService
  ) { }

  ngOnInit(): void {
    this.fetchReviews();
  }

  public fetchReviews() {
    const restaurantId = Number(this.activatedRoute.snapshot.paramMap.get('restaurantId'));
    this.customerFeedbackService.fetchReviews(restaurantId).subscribe(
      (data: FoodReview[]) => {
        console.log(data);
        this.foodReviews = data;
      }
    );
  }
}
