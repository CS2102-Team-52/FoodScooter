import { Component, OnInit } from '@angular/core';
import { RestaurantStaffService } from '../services/restaurant-staff.service';
import { ActivatedRoute } from '@angular/router';
import { FoodItem } from '../../customer/restaurants/restaurant/food-item';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {
  private restaurantId: number;

  menuColumns: string[] = ['name', 'category', 'price', 'availability'];
  menuDataSource = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantStaffService: RestaurantStaffService
  ) { }

  ngOnInit(): void {
    this.restaurantId = Number(this.activatedRoute.snapshot.paramMap.get('restaurantId'));
    this.restaurantStaffService.fetchMenu(this.restaurantId);
  }

  public fetchMenu() {
    this.restaurantStaffService.fetchMenu(this.restaurantId).subscribe(
      (data: FoodItem[]) => {
        console.log(data);
        this.menuDataSource = data;
    });
  }
}
