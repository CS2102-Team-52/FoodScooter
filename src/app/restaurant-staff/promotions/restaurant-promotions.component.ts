import { Component, OnInit } from '@angular/core';
import { PromotionType } from '../../promotions/promotion-type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-promotions',
  templateUrl: './restaurant-promotions.component.html',
  styleUrls: ['./restaurant-promotions.component.css']
})
export class RestaurantPromotionsComponent implements OnInit {
  restaurantId: number;
  promotionType: PromotionType;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.promotionType = PromotionType.RESTAURANT;
  }

  ngOnInit(): void {
    this.restaurantId = Number(this.activatedRoute.snapshot.parent.paramMap.get('restaurantId'));
  }
}
