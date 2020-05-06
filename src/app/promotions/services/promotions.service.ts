import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../../users/util';
import { Promotion } from '../promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public addRestaurantPromotion(restaurantId: number, promotion: Promotion) {
    return this.httpClient.post(`${Util.baseURL}/restaurants/${restaurantId}/promotions`, promotion);
  }

  public updateRestaurantPromotion(restaurantId: number, promotion: Promotion) {
    return this.httpClient.patch(`${Util.baseURL}/restaurants/${restaurantId}/promotions/${promotion.id}`, promotion);
  }

  public removeRestaurantPromotion(restaurantId: number, promotionIds: number[]) {
    return this.httpClient.post(`${Util.baseURL}/restaurants/${restaurantId}/promotions/batch-removal`, promotionIds);
  }

  public fetchPromotions(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/restaurants/${restaurantId}/promotions`);
  }
}
