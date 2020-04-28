import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../../../users/util';

@Injectable({
  providedIn: 'root'
})
export class CustomerReviewHistoryService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public fetchReviews(customerId: number) {
    return this.httpClient.get(`${Util.baseURL}/customers/${customerId}/reviews`);
  }
}
