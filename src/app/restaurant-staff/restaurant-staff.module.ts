import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantStaffComponent } from './restaurant-staff.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../core/material.module';
import { RestaurantMenuComponent } from './menu/restaurant-menu.component';
import { RestaurantStaffRoutingModule } from './restaurant-staff-routing.module';
import { RestaurantStaffSpringBoardComponent } from './restaurant-staff-spring-board.component';
import { FoodItemEditorComponent } from './menu/food-item-editor/food-item-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RestaurantProfileComponent } from './profile/restaurant-profile.component';
import { RestaurantSummaryComponent } from './summary/restaurant-summary.component';
import { RestaurantPromotionsComponent } from './promotions/restaurant-promotions.component';
import { PromotionsModule } from '../promotions/promotions.module';

@NgModule({
  declarations: [
    RestaurantStaffSpringBoardComponent,
    RestaurantStaffComponent,
    RestaurantMenuComponent,
    RestaurantPromotionsComponent,
    FoodItemEditorComponent,
    RestaurantProfileComponent,
    RestaurantSummaryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    RestaurantStaffRoutingModule,
    PromotionsModule
  ],
  exports: [
    RestaurantStaffRoutingModule,
    RestaurantStaffSpringBoardComponent,
    RestaurantStaffComponent,
    RestaurantMenuComponent
  ]
})
export class RestaurantStaffModule {
}
