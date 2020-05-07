import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from '../food-item';
import { CustomerOrder } from '../../services/dto/customer-order';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '../../../../store/payment-type.enum';
import { RestaurantsService } from '../../services/restaurants.service';
import { CustomerOrderOptions } from '../../services/dto/customer-order-options';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Promotion } from '../../../../promotions/promotion';
import { MatTableDataSource } from '@angular/material/table';
import { FoodItemQuantity } from './food-item-quantity';

@Component({
  selector: 'app-restaurant-order-placer',
  templateUrl: './restaurant-order-placer.component.html',
  styleUrls: ['./restaurant-order-placer.component.css']
})
export class RestaurantOrderPlacerComponent implements OnInit {
  private readonly customerId: number;
  private readonly restaurantId: number;

  foodItemsOrderedColumns: string[] = ['name', 'quantity'];

  foodItemsOrderedDataSource: MatTableDataSource<FoodItemQuantity>;

  orderForm = this.formBuilder.group({
    rewardPoints: [0],
    promotion: [0],
    paymentType: ['', Validators.required],
    deliveryLocation: ['', Validators.required]
  });

  foodItemsOrdered: Map<FoodItem, number>;
  rewardPoints: number;
  promotionalDiscount: number;
  recentDeliveryLocations: string[];
  paymentTypes: string[];
  availablePromotions: Promotion[];

  filteredOptions: Observable<string[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantsService
  ) {
    this.paymentTypes = Object.keys(PaymentType);
    this.foodItemsOrdered = new Map<FoodItem, number>();
    this.foodItemsOrderedDataSource = new MatTableDataSource<FoodItemQuantity>([]);

    this.promotionalDiscount = 0;
    this.recentDeliveryLocations = [];

    this.customerId = Number(this.activatedRoute.parent.snapshot.paramMap.get('customerId'));
    this.restaurantId = Number(this.activatedRoute.snapshot.paramMap.get('restaurantId'));
  }

  ngOnInit(): void {
    this.getOrderOptions();
    this.filteredOptions = this.orderForm.get('deliveryLocation').valueChanges
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
    if (!this.foodItemsOrdered.has(foodItem)) {
      this.foodItemsOrdered.set(foodItem, 0);
    }
    const quantity: number = this.foodItemsOrdered.get(foodItem);
    this.foodItemsOrdered.set(foodItem, quantity + 1);
    this.refreshDataSource();
  }

  @Input()
  public remove(foodItem: FoodItem) {
    if (!this.foodItemsOrdered.has(foodItem) || this.foodItemsOrdered.get(foodItem) == 0) {
      return;
    }
    const quantity = this.foodItemsOrdered.get(foodItem);
    this.foodItemsOrdered.set(foodItem, quantity - 1);
    this.refreshDataSource();
  }

  private refreshDataSource() {
    let data: FoodItemQuantity[] = [];
    this.foodItemsOrdered.forEach(
      (quantity, foodItem) => {
        const entry: FoodItemQuantity = {
          foodItem: foodItem,
          quantity: quantity
        };
        data.push(entry);
      }
    )
    this.foodItemsOrderedDataSource.data = data;
  }

  public has(foodItem: FoodItem) {
    return this.foodItemsOrdered.has(foodItem);
  }

  public getOrderOptions() {
    this.restaurantService.getCustomerOrderOptions(this.customerId).subscribe(
      (data: CustomerOrderOptions) => {
        console.log(data);
        this.rewardPoints = data.rewardPoints;
        this.availablePromotions = data.availablePromotions;
        this.paymentTypes = data.paymentTypes;
        this.recentDeliveryLocations = data.recentDeliveryLocations;
      }
    );
  }

  public sendOrder() {
    const incompleteCustomerOrder: CustomerOrder = {
      customerId: this.customerId,
      restaurantId: this.restaurantId,
      foodCost: null,
      rewardPointsUsed: this.orderForm.get('rewardPoints').value,
      discountApplied: this.orderForm.get('promotion').value,
      paymentType: this.orderForm.get('paymentType').value,
      deliveryLocation: this.orderForm.get('deliveryLocation').value,
      orderTime: new Date(),
      foodItems: null,
      quantity: null
    };
    console.log(incompleteCustomerOrder);
    this.restaurantService.placeOrder(this.foodItemsOrdered, incompleteCustomerOrder).subscribe(_ => {});
  }
}
