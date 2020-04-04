import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Util } from 'src/app/users/util';
import { User } from 'src/app/users/user';
import { Rider } from "../../../users/rider/rider";

@Injectable({
  providedIn: 'root'
})
export class RiderService {

  constructor(private httpClient: HttpClient) { }

  addRider(rider: Rider) {
    return this.httpClient.post(`${Util.baseURL}/riders`, rider);
  }

  acceptOrder(drid: number, orderId: number) {
    return this.httpClient.put(`${Util.baseURL}/rider/${drid}/acceptOrder/`, orderId);
  }

  fetchAcceptedOrders(drid: number) {
    return this.httpClient.get(`${Util.baseURL}/rider/${drid}/acceptedOrders/`);
  }

  fetchAllRiders(): Observable<any> {
    return this.httpClient.get(`${Util.baseURL}/riders`);
  }

  fetchRiderInfo(drid: number): Observable<any> {
    return this.httpClient.get(`${Util.baseURL}/rider/${drid}/riderInfo`);
  }
}
