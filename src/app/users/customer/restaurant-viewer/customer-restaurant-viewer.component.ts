import { Component, OnInit } from '@angular/core';
import { Restaurant } from "../../../store/restaurant";
import { RestaurantService } from "../../../services/common/restaurant/restaurant.service";

@Component({
  selector: 'app-restaurant-viewer',
  templateUrl: './customer-restaurant-viewer.component.html',
  styleUrls: ['./customer-restaurant-viewer.component.css']
})
export class CustomerRestaurantViewerComponent implements OnInit {
  restaurants: Restaurant[];

  constructor(
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
  }

  public fetchRestaurants() {
    this.restaurantService.fetchRestaurants().subscribe(
      (data: Restaurant[]) => this.restaurants = data)
  }
}
