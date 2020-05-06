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

  public fetchPromotions(restaurantId: number) {
    let endpointUrl: string = `${Util.baseURL}/`;
    if (restaurantId != undefined) {
      endpointUrl += `restaurants/${restaurantId}/`;
    }
    endpointUrl += 'promotions';
    console.log(endpointUrl);
    return this.httpClient.get(endpointUrl);
  }

  public addPromotion(restaurantId: number, promotion: Promotion) {
    let endpointUrl: string = `${Util.baseURL}/`;
    if (restaurantId != undefined) {
      endpointUrl += `restaurants/${restaurantId}/`;
    }
    endpointUrl += 'promotions';
    console.log(endpointUrl);
    return this.httpClient.post(endpointUrl, promotion);
  }

  public updatePromotion(restaurantId: number, promotion: Promotion) {
    let endpointUrl: string = `${Util.baseURL}/`;
    if (restaurantId != undefined) {
      endpointUrl += `restaurants/${restaurantId}/`;
    }
    endpointUrl += `promotions/${promotion.id}`;
    return this.httpClient.patch(endpointUrl, promotion);
  }

  public removePromotion(restaurantId: number, promotionIds: number[]) {
    let endpointUrl = `${Util.baseURL}/`;
    if (restaurantId != undefined) {
      endpointUrl += `restaurants/${restaurantId}/`;
    }
    endpointUrl += 'promotions/batch-removal';
    return this.httpClient.post(endpointUrl, promotionIds);
  }
}
