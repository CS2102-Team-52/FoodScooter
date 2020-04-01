import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(
    private httpClient: HttpClient
  ) { }

  fetchAllCustomers(): Observable<any> {
   return this.httpClient.get("http://localhost:8080/api/customers");
  }
}
