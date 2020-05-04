import { Component, OnInit } from '@angular/core';
import {RestaurantSummary} from "../../store/summaries/restaurantSummary";
import {PromotionSummary} from "../../store/summaries/promotionSummary";
import {RestaurantStaffService} from "../services/restaurant-staff.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-restaurant-summary',
  templateUrl: './restaurant-summary.component.html',
  styleUrls: ['./restaurant-summary.component.css']
})
export class RestaurantSummaryComponent implements OnInit {
  private restaurantId: number;
  restaurantSummaryList: RestaurantSummary[];
  promotionSummaryList: PromotionSummary[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantStaffService: RestaurantStaffService
  ) { }

  ngOnInit(): void {
    this.restaurantId = Number(this.activatedRoute.parent.snapshot.paramMap.get('restaurantId'));
    this.getSummaries();
  }

  getSummaries(): void {
    this.restaurantStaffService.fetchRestaurantSummary(this.restaurantId).subscribe((data: any[]) => {
      console.log(data);
      this.restaurantSummaryList = data;
    });
    this.restaurantStaffService.fetchPromotionSummary(this.restaurantId).subscribe((data: any[]) => {
      console.log(data);
      this.promotionSummaryList = data;
    });
  }
}
