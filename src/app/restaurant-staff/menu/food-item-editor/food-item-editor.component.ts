import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FoodItem } from '../../../customer/restaurants/restaurant/food-item';
import { FoodItemEditMode } from './food-item-edit-mode.enum';
import { RestaurantStaffService } from '../../services/restaurant-staff.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-food-item-editor',
  templateUrl: './food-item-editor.component.html',
  styleUrls: ['./food-item-editor.component.css']
})
export class FoodItemEditorComponent implements OnInit {
  private restaurantId: number;

  @Input() mode: FoodItemEditMode;
  @Input() foodItem: FoodItem;

  @Output() foodItemResult: EventEmitter<FoodItem>;

  foodItemForm = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
    availability: ['', Validators.required]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restaurantStaffService: RestaurantStaffService
  ) {
    this.foodItemResult = new EventEmitter<FoodItem>();
  }

  ngOnInit(): void {
    this.restaurantId = Number(this.activatedRoute.parent.snapshot.paramMap.get('restaurantId'));
    if (this.mode == FoodItemEditMode.UPDATE) {
      this.foodItemForm.setValue({
        name: this.foodItem.name,
        category: this.foodItem.category,
        price: this.foodItem.price,
        availability: this.foodItem.availability
      });
    }
  }

  public submit() {
    const foodItem: FoodItem = {
      id: this.foodItem == undefined ? null : this.foodItem.id,
      name: this.foodItemForm.get('name').value,
      category: this.foodItemForm.get('category').value,
      price: this.foodItemForm.get('price').value,
      availability: this.foodItemForm.get('availability').value
    }
    let action: Observable<Object>;
    switch(this.mode) {
      case FoodItemEditMode.ADD:
        action = this.restaurantStaffService.addFoodItems(this.restaurantId, foodItem);
        break;
      case FoodItemEditMode.UPDATE:
        action = this.restaurantStaffService.updateFoodItem(this.restaurantId, foodItem);
        break;
      default:
        // will not reach here
    }
    return action.subscribe(_ => this.foodItemResult.emit(foodItem));
  }
}
