import { Component, OnInit } from '@angular/core';
import { Customer } from "./customer";
import { CustomerService } from "../../services/users/customer/customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  value = "Hello";
  restaurants;
  customers: Customer[];

  constructor(
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {

  }

  fetchCustomers() {
    this.customerService.fetchAllCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    });
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
