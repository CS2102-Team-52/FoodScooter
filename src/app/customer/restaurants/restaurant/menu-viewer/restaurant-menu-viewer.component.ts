import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodItem } from '../food-item';
import { RestaurantsService } from '../../services/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { RestaurantOrderPlacerComponent } from '../order-placer/restaurant-order-placer.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-restaurant-menu-viewer',
  templateUrl: './restaurant-menu-viewer.component.html',
  styleUrls: ['./restaurant-menu-viewer.component.css']
})
export class RestaurantMenuViewerComponent implements OnInit {
  private restaurantId: number;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(RestaurantOrderPlacerComponent) orderPlacer;

  menuColumns: string[] = ['name', 'category', 'price', 'availability', 'actions'];

  menuDataSource: MatTableDataSource<FoodItem>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantsService
  ) { }

  ngOnInit(): void {
    this.restaurantId = Number(this.activatedRoute.snapshot.paramMap.get('restaurantId'));
    this.fetchFoodItems();
  }

  public fetchFoodItems() {
    this.restaurantService.fetchFoodItems(this.restaurantId).subscribe(
      (data: FoodItem[]) => {
        console.log(data);
        this.menuDataSource = new MatTableDataSource<FoodItem>(data);
        this.menuDataSource.sort = this.sort;
      }
    );
  }

  public add(foodItem: FoodItem) {
    console.log(foodItem);
    if (foodItem.availability == 0) {
      alert("Item has run out");
      return;
    }
    foodItem.availability -= 1;
    this.orderPlacer.add(foodItem);
  }

  public remove(foodItem: FoodItem) {
    if (this.orderPlacer.has(foodItem)) {
      this.orderPlacer.remove(foodItem);
      foodItem.availability += 1;
    }
  }
}
