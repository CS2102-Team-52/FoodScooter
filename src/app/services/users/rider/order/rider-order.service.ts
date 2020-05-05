import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Util } from '../../../../users/util';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RiderOrderService {

  constructor(private httpClient: HttpClient) {
  }

  public fetchPartTimeOrders(drid: number) {
    return this.httpClient.get(`${Util.baseURL}/rider/${drid}/partTimeOrders`);
  }

  public fetchFullTimeOrders(drid: number) {
    return this.httpClient.get(`${Util.baseURL}/rider/${drid}/fullTimeOrders`);
  }

  public fetchRiderSummary(drid: number) {
    return this.httpClient.get(`${Util.baseURL}/rider/${drid}/orderSummary`);
  }

  public acceptOrder(drid: number, orderId: number) {
    return this.httpClient.put(`${Util.baseURL}/rider/${drid}/acceptOrder/`, orderId);
  }

  public doneOrder(drid: number, orderId: number) {
    return this.httpClient.put(`${Util.baseURL}/rider/${drid}/doneOrder/`, orderId);
  }

  public reachRestaurant(drid: number, orderId: number) {
    return this.httpClient.put(`${Util.baseURL}/rider/${drid}/reachRestaurant/`, orderId);
  }

  public leaveRestaurant(drid: number, orderId: number) {
    return this.httpClient.put(`${Util.baseURL}/rider/${drid}/leaveRestaurant/`, orderId);
  }

  public fetchAcceptedOrders(drid: number) {
    return this.httpClient.get(`${Util.baseURL}/rider/${drid}/acceptedOrders/`).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
