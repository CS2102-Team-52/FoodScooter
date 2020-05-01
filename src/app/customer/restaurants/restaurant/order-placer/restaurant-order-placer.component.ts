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

@Component({
  selector: 'app-restaurant-order-placer',
  templateUrl: './restaurant-order-placer.component.html',
  styleUrls: ['./restaurant-order-placer.component.css']
})
export class RestaurantOrderPlacerComponent implements OnInit {
  orderForm = this.formBuilder.group({
    rewardPoints: [''],
    paymentType: ['', Validators.required],
    deliveryLocation: ['', Validators.required]
  })

  foodItemsInOrder: FoodItem[];
  rewardPoints: number;
  recentDeliveryLocations: string[];
  paymentTypes: string[];

  filteredOptions: Observable<string[]>;

  private readonly customerId: number;
  private readonly restaurantId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantsService
  ) {
    this.paymentTypes = Object.keys(PaymentType);
    this.foodItemsInOrder = [];

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
    const incompleteCustomerOrder: CustomerOrder = {
      customerId: this.customerId,
      restaurantId: this.restaurantId,
      foodCost: null,
      rewardPointsUsed: this.rewardPoints,
      paymentType: this.orderForm.get('paymentType').value,
      deliveryLocation: this.orderForm.get('deliveryLocation').value,
      orderTime: new Date(),
      foodItems: null,
      quantity: null
    };
    this.restaurantService.placeOrder(this.foodItemsInOrder, incompleteCustomerOrder).subscribe(_ => {});
  }
}
