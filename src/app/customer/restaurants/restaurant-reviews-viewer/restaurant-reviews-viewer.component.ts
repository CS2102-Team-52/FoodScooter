import { Component, OnInit } from '@angular/core';
import { CustomerFeedbackService } from '../../order-history/services/customer-feedback.service';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../review-history/review';

@Component({
  selector: 'app-restaurant-reviews-viewer',
  templateUrl: './restaurant-reviews-viewer.component.html',
  styleUrls: ['./restaurant-reviews-viewer.component.css']
})
export class RestaurantReviewsViewerComponent implements OnInit {
  reviews: Review[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerFeedbackService: CustomerFeedbackService
  ) { }

  ngOnInit(): void {
    this.fetchReviews();
  }

  public fetchReviews() {
    const restaurantId = Number(this.activatedRoute.snapshot.paramMap.get('restaurantId'));
    this.customerFeedbackService.fetchReviews(restaurantId).subscribe(
      (data: Review[]) => {
        console.log(data);
        this.reviews = data;
      }
    );
  }
}
