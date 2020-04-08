import { Component, OnInit } from '@angular/core';
import { FoodItem } from "../../../store/food-item";
import { RestaurantService } from "../../../services/common/restaurant/restaurant.service";
import { ActivatedRoute } from "@angular/router";
import { CustomerOrderService } from "../../../services/users/customer/order/customer-order.service";
import { OrderedFoodItems } from "../../../services/users/customer/order/dto/ordered-food-items";

@Component({
  selector: 'app-menu-viewer',
  templateUrl: './menu-viewer.component.html',
  styleUrls: ['./menu-viewer.component.css']
})
export class MenuViewer implements OnInit {
  private restaurantId: number;
  foodItems: FoodItem[];
  foodItemsInOrder: FoodItem[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private orderService: CustomerOrderService
  ) { }

  ngOnInit(): void {
    this.restaurantId = Number(this.activatedRoute.snapshot.paramMap.get('restaurantId'));
    this.fetchFoodItems(this.restaurantId);
    this.foodItemsInOrder = [];
  }

  public fetchFoodItems(restaurantId: number) {
    this.restaurantService.fetchFoodItems(restaurantId).subscribe(
      (data: FoodItem[]) => this.foodItems = data
    )
  }

  public add(foodItem: FoodItem) {
    this.foodItemsInOrder.push(foodItem);
  }

  public remove(foodItem: FoodItem) {
    this.foodItemsInOrder = this.foodItemsInOrder.filter(item => item.id != foodItem.id);
  }

  public sendOrder() {
    const orderedFoodItems = this.constructOrder();
    const customerId = Number(this.activatedRoute.snapshot.paramMap.get('customerId'));
    this.orderService.placeOrder(customerId, orderedFoodItems);
  }

  private constructOrder() {
    let items = new Map();
    for (let foodItem of this.foodItemsInOrder) {
      if (items.has(foodItem.id)) {
        let count = items.get(foodItem.id);
        items.set(foodItem.id, count + 1);
      } else {
        items.set(foodItem.id, 1);
      }
    }
    const orderedFoodItems: OrderedFoodItems = {
      foodItems: Array.from(items.keys()),
      quantity: Array.from(items.values())
    };
    return orderedFoodItems;
  }
}
