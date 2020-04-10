import { Component, OnInit } from '@angular/core';
import { Restaurant } from "../../../store/restaurant";
import { RestaurantService } from "../../../services/common/restaurant/restaurant.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-restaurants-viewer',
  templateUrl: './restaurants-viewer.component.html',
  styleUrls: ['./restaurants-viewer.component.css']
})
export class RestaurantsViewerComponent implements OnInit {
  restaurants: Restaurant[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  public fetchRestaurants() {
    this.restaurantService.fetchRestaurants().subscribe(
      (data: Restaurant[]) => {
        this.restaurants = data;
      })
  }

  public showMenu(restaurantId: number) {
    this.router.navigate([restaurantId], {relativeTo: this.activatedRoute}).then(_ => {});
  }
}
