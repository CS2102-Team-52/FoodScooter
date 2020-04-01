import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Util } from "../../../users/util";
import { Injectable } from "@angular/core";
import { Customer } from "../../../users/customer/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  addCustomer(customer: Customer) {
    return this.httpClient.post(`${Util.baseURL}/customers`, customer);
  }

  fetchAllCustomers(): Observable<any> {
    return this.httpClient.get(`${Util.baseURL}/customers`);
  }
}
