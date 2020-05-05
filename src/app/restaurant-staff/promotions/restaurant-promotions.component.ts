import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PromotionsService} from "../../services/common/promotions.service";
import {PromotionEditMode} from "./promotion-editor/promotion-edit-mode.enum";
import {Promotion} from "../../store/promotion";

@Component({
  selector: 'app-restaurant-promotions',
  templateUrl: './restaurant-promotions.component.html',
  styleUrls: ['./restaurant-promotions.component.css']
})
export class RestaurantPromotionsComponent implements OnInit {
  private restaurantId: number;

  promotionEditorMode: PromotionEditMode;
  toShowPromotionEditor: boolean;
  promotionToUpdate: Promotion;

  constructor(
    private activatedRoute: ActivatedRoute,
    private promotionsService: PromotionsService
  ) {
    this.toShowPromotionEditor = false;
  }

  ngOnInit(): void {
    this.restaurantId = Number(this.activatedRoute.parent.snapshot.paramMap.get('restaurantId'));
  }

  addPromotion() {
    this.promotionEditorMode = PromotionEditMode.ADD;
    this.toShowPromotionEditor = true;
  }

  updatePromotion() {
    this.promotionEditorMode = PromotionEditMode.UPDATE;
    //this.promotionToUpdate = this.selectedFoodItems.selected[0];
    this.toShowPromotionEditor = true;
    //this.selectedFoodItems.clear();
  }

  handlePromotionEditorCompletion(event: any) {
    this.toShowPromotionEditor = false;
    const promotion: Promotion = event as Promotion;
  }
}
