import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from '../food-item';
import { CustomerOrderDetails } from '../services/dto/customer-order-details';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '../../../store/payment-type.enum';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-restaurant-order-placer',
  templateUrl: './restaurant-order-placer.component.html',
  styleUrls: ['./restaurant-order-placer.component.css']
})
export class RestaurantOrderPlacerComponent implements OnInit {
  foodItemsInOrder: FoodItem[];
  rewardPoints: number;
  deliveryLocation: string;
  recentDeliveryLocations: string[];
  paymentTypes: string[];
  paymentType: PaymentType;

  private readonly customerId: number;
  private readonly restaurantId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {
    this.paymentTypes = Object.keys(PaymentType);
    this.foodItemsInOrder = [];

    this.customerId = Number(this.activatedRoute.snapshot.paramMap.get('customerId'));
    this.restaurantId = Number(this.activatedRoute.snapshot.paramMap.get('restaurantId'));
  }

  ngOnInit(): void {
    this.getRewardPoints();
    this.getRecentDeliveryLocations();
  }

  @Input()
  public add(foodItem: FoodItem) {
    this.foodItemsInOrder.push(foodItem);
  }

  @Input()
  public remove(foodItem: FoodItem) {
    this.foodItemsInOrder = this.foodItemsInOrder.filter(item => item.id !== foodItem.id);
  }

  public getRewardPoints() {
    this.restaurantService.getRewardPoints(this.customerId).subscribe(
      (data: number) => this.rewardPoints = data
    );
  }

  public getRecentDeliveryLocations() {
    this.restaurantService.getRecentDeliveryLocations(this.customerId).subscribe(
      (data: string[]) => this.recentDeliveryLocations = data
    );
  }

  public sendOrder() {
    const order = this.constructOrder();
    console.log(order);
    this.restaurantService.placeOrder(this.customerId, order).subscribe(_ => {});
  }

  public displayWith(value: number) {
    return value;
  }

  private constructOrder() {
    const totalFoodCost = this.computeTotalFoodCost();
    const items = this.consolidateFoodItems();

    const customerOrderDetails: CustomerOrderDetails = {
      customerId: this.customerId,
      restaurantId: this.restaurantId,
      totalFoodCost: totalFoodCost,
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
