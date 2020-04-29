import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../../users/util';

@Injectable({
  providedIn: 'root'
})
export class RestaurantStaffService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public fetchMenu(restaurantId: number) {
    return this.httpClient.get(`${Util.baseURL}/restaurants/${restaurantId}/menu`);
  }

  public getEmployingRestaurant(staffId: number) {
    return this.httpClient.get(`${Util.baseURL}/staff/${staffId}`);
  }

}
