import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from '../../../store/food-item';
import { CustomerOrderDetails } from './services/dto/customer-order-details';
import { CustomerOrderService } from './services/customer-order.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '../../../store/payment-type.enum';

@Component({
  selector: 'app-restaurant-order-placer',
  templateUrl: './restaurant-order-placer.component.html',
  styleUrls: ['./restaurant-order-placer.component.css']
})
export class RestaurantOrderPlacerComponent implements OnInit {
  foodItemsInOrder: FoodItem[];
  paymentTypes: string[];
  paymentType: PaymentType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: CustomerOrderService
  ) {
    this.paymentTypes = Object.keys(PaymentType);
    this.foodItemsInOrder = [];
  }

  ngOnInit(): void {
  }

  @Input()
  public add(foodItem: FoodItem) {
    this.foodItemsInOrder.push(foodItem);
  }

  @Input()
  public remove(foodItem: FoodItem) {
    this.foodItemsInOrder = this.foodItemsInOrder.filter(item => item.id !== foodItem.id);
  }

  public sendOrder() {
    const order = this.constructOrder();
    console.log(order);
    const customerId = Number(this.activatedRoute.snapshot.paramMap.get('customerId'));
    this.orderService.placeOrder(customerId, order).subscribe(_ => {});
  }

  private constructOrder() {
    const totalFoodCost = this.computeTotalFoodCost();
    const items = this.consolidateFoodItems();

    const customerId = Number(this.activatedRoute.snapshot.paramMap.get('customerId'));
    const restaurantId = Number(this.activatedRoute.snapshot.paramMap.get('restaurantId'));

    const customerOrderDetails: CustomerOrderDetails = {
      customerId,
      restaurantId,
      totalFoodCost,
      paymentType: this.paymentType,
      location: 'Serangoon',
      orderTime: new Date(),
      foodItems: Array.from(items.keys()),
      quantity: Array.from(items.values())
    };
    return customerOrderDetails;
  }

  private consolidateFoodItems() {
    const items = new Map();
    for (const foodItem of this.foodItemsInOrder) {
      if (items.has(foodItem.id)) {
        const count = items.get(foodItem.id);
        items.set(foodItem.id, count + 1);
      } else {
        items.set(foodItem.id, 1);
      }
    }
    return items;
  }

  private computeTotalFoodCost() {
    let totalCost = 0;
    for (const foodItem of this.foodItemsInOrder) {
      totalCost += foodItem.price;
    }
    return totalCost;
  }
}
