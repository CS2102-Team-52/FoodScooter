import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodReview } from './food-review';
import { RestaurantsService } from '../../services/restaurants.service';

@Component({
  selector: 'app-restaurant-reviews-viewer',
  templateUrl: './restaurant-reviews-viewer.component.html',
  styleUrls: ['./restaurant-reviews-viewer.component.css']
})
export class RestaurantReviewsViewerComponent implements OnInit {
  private restaurantId: number;

  foodReviews: FoodReview[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantsService: RestaurantsService
  ) { }

  ngOnInit(): void {
    this.restaurantId = Number(this.activatedRoute.snapshot.paramMap.get('restaurantId'));
    this.fetchReviews();
  }

  public fetchReviews() {
    this.restaurantsService.fetchReviews(this.restaurantId).subscribe(
      (data: FoodReview[]) => {
        console.log(data);
        this.foodReviews = data;
      }
    );
  }
}
