import { Component, OnInit } from '@angular/core';
import { PromotionType } from '../../promotions/promotion-type';

@Component({
  selector: 'app-restaurant-promotions',
  templateUrl: './restaurant-promotions.component.html',
  styleUrls: ['./restaurant-promotions.component.css']
})
export class RestaurantPromotionsComponent implements OnInit {
  promotionType: PromotionType;

  constructor() {
    this.promotionType = PromotionType.RESTAURANT;
  }

  ngOnInit(): void {
  }

}
