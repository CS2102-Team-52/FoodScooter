import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantStaffService } from '../services/restaurant-staff.service';
import { ActivatedRoute } from '@angular/router';
import { FoodItem } from '../../customer/restaurants/restaurant/food-item';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { FoodItemEditMode } from './food-item-editor/food-item-edit-mode.enum';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {
  private restaurantId: number;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  menuColumns: string[] = ['select', 'name', 'category', 'price', 'availability'];
  menuDataSource: MatTableDataSource<FoodItem>;
  selectedFoodItems = new SelectionModel<FoodItem>(true, []);

  foodItemEditorMode: FoodItemEditMode;
  toShowFoodItemEditor: boolean;
  foodItemToUpdate: FoodItem;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantStaffService: RestaurantStaffService
  ) {
    this.toShowFoodItemEditor = false;
  }

  ngOnInit(): void {
    this.restaurantId = Number(this.activatedRoute.parent.snapshot.paramMap.get('restaurantId'));
    this.populateMenu();
  }

  public populateMenu() {
    this.restaurantStaffService.fetchMenu(this.restaurantId).subscribe(
      (data: FoodItem[]) => {
        console.log(data);
        this.menuDataSource = new MatTableDataSource<FoodItem>(data);
        this.menuDataSource.sort = this.sort;
    });
  }

  filterFoodItems(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.menuDataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selectedFoodItems.selected.length;
    const numRows = this.menuDataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selectedFoodItems.clear() :
      this.menuDataSource.data.forEach(row => this.selectedFoodItems.select(row));
  }

  addFoodItem() {
    this.foodItemEditorMode = FoodItemEditMode.ADD;
    this.toShowFoodItemEditor = true;
  }

  updateFoodItem() {
    this.foodItemEditorMode = FoodItemEditMode.UPDATE;
    this.foodItemToUpdate = this.selectedFoodItems.selected[0];
    this.toShowFoodItemEditor = true;
    this.selectedFoodItems.clear();
  }

  removeFoodItems() {
    const foodItemsToRemove: FoodItem[] = this.selectedFoodItems.selected;
    this.selectedFoodItems.clear();
    console.log(foodItemsToRemove);
    for (const foodItemToRemove of foodItemsToRemove) {
      this.menuDataSource = new MatTableDataSource<FoodItem>(this.menuDataSource.data.filter(foodItem => foodItem != foodItemToRemove))
    }
    this.restaurantStaffService.removeFoodItems(
      this.restaurantId,
      foodItemsToRemove.map(foodItem => foodItem.id)
    ).subscribe(_ => {});
  }

  handleFoodItemEditorCompletion(event: any) {
    this.toShowFoodItemEditor = false;
    const foodItem: FoodItem = event as FoodItem;
    const data = this.menuDataSource.data;
    if (foodItem.id == null) {
      data.push(foodItem);
      this.menuDataSource.data = data;
    } else {
      const updatedMenu = [];
      data.forEach(f => {
        if (f.id == foodItem.id) {
          f = foodItem;
        }
        updatedMenu.push(f);
      });
      this.menuDataSource.data = updatedMenu;
    }
  }
}
