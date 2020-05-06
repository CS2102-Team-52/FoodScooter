import { Component } from '@angular/core';
import { PromotionType } from '../../promotions/promotion-type';

@Component({
  selector: 'app-fds-manager-promotions',
  templateUrl: './fds-manager-promotions.component.html',
  styleUrls: ['./fds-manager-promotions.component.css']
})
export class FdsManagerPromotionsComponent {
  promotionType: PromotionType;

  constructor() {
    this.promotionType = PromotionType.FOOD_SCOOTER;
  }
}
