import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  value = "Hello";
  restaurants;

  constructor() { }

  ngOnInit(): void {
    this.restaurants = this.fetchRestaurants();
  }

  fetchRestaurants(): string[] {
    return ['McDonald\'s', 'Peranakan Boat'];
  }

  fetchMenu(restaurant: string) {

  }

  placeOrder() {

  }

  deleteOrder() {

  }

  fetchOrderHistory() {

  }

  rateRider() {

  }

  reviewFood() {

  }

  fetchReviews() {

  }
}
