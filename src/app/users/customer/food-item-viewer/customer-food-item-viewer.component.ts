import { Component, OnInit } from '@angular/core';
import { FoodItem } from "../../../store/food-item";
import { RestaurantService } from "../../../services/common/restaurant/restaurant.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-food-item-viewer',
  templateUrl: './customer-food-item-viewer.component.html',
  styleUrls: ['./customer-food-item-viewer.component.css']
})
export class CustomerFoodItemViewerComponent implements OnInit {
  private restaurantId: number;
  foodItems: FoodItem[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.restaurantId = this.activatedRoute.paramMap["restaurantId"];
    this.fetchFoodItems(this.restaurantId);
  }

  public fetchFoodItems(restaurantId: number) {
    this.restaurantService.fetchFoodItems(restaurantId).subscribe(
      (data: FoodItem[]) => this.foodItems = data
    )
  }
}
