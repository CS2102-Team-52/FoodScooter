import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from '../food-item';
import { CustomerOrderDetails } from '../../services/dto/customer-order-details';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '../../../../store/payment-type.enum';
import { RestaurantsService } from '../../services/restaurants.service';
import { CustomerOrderOptions } from '../../services/dto/customer-order-options';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-order-placer',
  templateUrl: './restaurant-order-placer.component.html',
  styleUrls: ['./restaurant-order-placer.component.css']
})
export class RestaurantOrderPlacerComponent implements OnInit {
  foodItemsInOrder: FoodItem[];
  rewardPoints: number;
  recentDeliveryLocations: string[];
  paymentTypes: string[];
  paymentType: PaymentType;

  myControl: FormControl;
  filteredOptions: Observable<string[]>;

  private readonly customerId: number;
  private readonly restaurantId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantsService
  ) {
    this.paymentTypes = Object.keys(PaymentType);
    this.foodItemsInOrder = [];

    this.myControl = new FormControl();
    this.recentDeliveryLocations = [];

    this.customerId = Number(this.activatedRoute.parent.snapshot.paramMap.get('customerId'));
    this.restaurantId = Number(this.activatedRoute.snapshot.paramMap.get('restaurantId'));
  }

  ngOnInit(): void {
    this.getOrderOptions();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.recentDeliveryLocations.filter(option => option.toLowerCase().includes(filterValue));
  }

  @Input()
  public add(foodItem: FoodItem) {
    this.foodItemsInOrder.push(foodItem);
  }

  @Input()
  public remove(foodItem: FoodItem) {
    this.foodItemsInOrder = this.foodItemsInOrder.filter(item => item.id !== foodItem.id);
  }

  public getOrderOptions() {
    this.restaurantService.getCustomerOrderOptions(this.customerId).subscribe(
      (data: CustomerOrderOptions) => {
        console.log(data);
        this.rewardPoints = data.rewardPoints;
        this.recentDeliveryLocations = data.recentDeliveryLocations;
      }
    );
  }

  public sendOrder() {
    const order = this.constructOrder();
    this.restaurantService.placeOrder(this.customerId, order).subscribe(_ => {});
  }

  private constructOrder() {
    const totalFoodCost = this.computeTotalFoodCost();
    const items = this.consolidateFoodItems();

    const customerOrderDetails: CustomerOrderDetails = {
      customerId: this.customerId,
      restaurantId: this.restaurantId,
      foodCost: totalFoodCost,
      rewardPointsUsed: this.rewardPoints,
      paymentType: this.paymentType,
      deliveryLocation: this.myControl.value,
      orderTime: new Date(),
      foodItems: Array.from(items.keys()),
      quantity: Array.from(items.values())
    };
    console.log(customerOrderDetails);
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
