import { Component, OnInit } from '@angular/core';
import { FoodItem } from "../../../store/food-item";
import { RestaurantService } from "../../../services/common/restaurant/restaurant.service";
import { ActivatedRoute } from "@angular/router";
import { isElementScrolledOutsideView } from "@angular/cdk/overlay/position/scroll-clip";

@Component({
  selector: 'app-menu-viewer',
  templateUrl: './menu-viewer.component.html',
  styleUrls: ['./menu-viewer.component.css']
})
export class MenuViewer implements OnInit {
  private restaurantId: number;
  foodItems: FoodItem[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.restaurantId = Number(this.activatedRoute.snapshot.paramMap.get('restaurantId'));
    console.log(this.restaurantId);
    this.fetchFoodItems(this.restaurantId);
  }

  public fetchFoodItems(restaurantId: number) {
    this.restaurantService.fetchFoodItems(restaurantId).subscribe(
      (data: FoodItem[]) => this.foodItems = data
    )
  }
}
