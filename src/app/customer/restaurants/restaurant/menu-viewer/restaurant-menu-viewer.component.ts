import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodItem } from '../food-item';
import { RestaurantsService } from '../../services/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { RestaurantOrderPlacerComponent } from '../order-placer/restaurant-order-placer.component';

@Component({
  selector: 'app-restaurant-menu-viewer',
  templateUrl: './restaurant-menu-viewer.component.html',
  styleUrls: ['./restaurant-menu-viewer.component.css']
})
export class RestaurantMenuViewerComponent implements OnInit {
  private restaurantId: number;

  foodItems: FoodItem[];

  @ViewChild(RestaurantOrderPlacerComponent) orderPlacerComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantsService
  ) { }

  ngOnInit(): void {
    this.restaurantId = Number(this.activatedRoute.snapshot.paramMap.get('restaurantId'));
    this.fetchFoodItems(this.restaurantId);
  }

  public fetchFoodItems(restaurantId: number) {
    this.restaurantService.fetchFoodItems(restaurantId).subscribe(
      (data: FoodItem[]) => {
        console.log(data);
        this.foodItems = data;
      }
    );
  }

  public add(foodItem: FoodItem) {
    this.orderPlacerComponent.add(foodItem);
  }

  public remove(foodItem: FoodItem) {
    this.orderPlacerComponent.remove(foodItem);
  }
}
