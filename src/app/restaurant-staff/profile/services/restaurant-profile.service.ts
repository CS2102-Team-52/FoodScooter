import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../../../store/restaurant';
import { Util } from '../../../users/util';

@Injectable({
  providedIn: 'root'
})
export class RestaurantProfileService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public getRestaurant(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/restaurants/${restaurantId}`);
  }

  public patchRestaurant(restaurantId: number, restaurant: Restaurant) {
    return this.httpClient.patch(`${Util.baseURL}/restaurants/${restaurantId}`, restaurant);
  }
}
