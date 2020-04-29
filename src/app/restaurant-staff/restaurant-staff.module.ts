import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantStaffComponent } from './restaurant-staff.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../core/material.module';
import { RestaurantMenuComponent } from './menu/restaurant-menu.component';
import { RestaurantPromotionsComponent } from './promotions/restaurant-promotions.component';
import { RestaurantStaffRoutingModule } from './restaurant-staff-routing.module';
import { RestaurantStaffSpringBoardComponent } from './restaurant-staff-spring-board.component';

@NgModule({
  declarations: [
    RestaurantStaffComponent,
    RestaurantMenuComponent,
    RestaurantPromotionsComponent,
    RestaurantStaffSpringBoardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RestaurantStaffRoutingModule,
    MaterialModule
  ]
})
export class RestaurantStaffModule { }
