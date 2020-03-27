import { Component, OnInit } from '@angular/core';
import { Customer } from "./customer";
import {CustomerService} from "../../services/customer/customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [ CustomerService ]
})
export class CustomerComponent implements OnInit {
  value = "Hello";
  restaurants;
  customers: Customer[];

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe((data: Customer[]) => this.customers = data);
    console.log("hello");
    console.log(this.customers);
    // this.restaurants = this.fetchRestaurants();
  }

  fetchCustomers() {
    // this.customerService.getAllCustomers().subscribe((data: Customer[]) => this.customers = data);
    // console.log(this.customers);
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
