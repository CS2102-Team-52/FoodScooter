import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Promotion} from "../../store/promotion";
import {Util} from "../../users/util";

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public addRestaurantPromotion(restaurantId: number, promotion: Promotion) {
    return this.httpClient.put(`${Util.baseURL}/restaurants/${restaurantId}/promotions/add`, promotion);
  }

  public updateRestaurantPromotion(restaurantId: number, promotion: Promotion) {
    return this.httpClient.patch(`${Util.baseURL}/restaurants/${restaurantId}/promotions/update`, promotion);
  }

  public removeRestaurantPromotion(restaurantId: number, promotionId: number) {
    return this.httpClient.post(`${Util.baseURL}/restaurants/${restaurantId}/promotions/remove`, promotionId);
  }
}
