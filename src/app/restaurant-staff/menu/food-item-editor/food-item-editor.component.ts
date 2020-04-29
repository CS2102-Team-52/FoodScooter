import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FoodItem } from '../../../customer/restaurants/restaurant/food-item';
import { FoodItemEditMode } from './food-item-edit-mode.enum';

@Component({
  selector: 'app-food-item-editor',
  templateUrl: './food-item-editor.component.html',
  styleUrls: ['./food-item-editor.component.css']
})
export class FoodItemEditorComponent implements OnInit {
  @Input() mode: FoodItemEditMode;
  @Input() foodItem: FoodItem;

  foodItemForm = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
    availability: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.mode == FoodItemEditMode.UPDATE) {
      this.foodItemForm.setValue({
        name: this.foodItem.name,
        category: this.foodItem.category,
        price: this.foodItem.price,
        availability: this.foodItem.availability
      });
    }
  }
}
