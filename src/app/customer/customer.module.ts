import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { MaterialModule } from '../core/material.module';
import { RouterModule } from '@angular/router';
import { RestaurantsViewerComponent } from './restaurants/viewer/restaurants-viewer.component';
import { RestaurantViewerComponent } from './restaurants/restaurant/viewer/restaurant-viewer.component';
import { CustomerOrderHistoryModule } from './order-history/customer-order-history.module';
import { CustomerReviewHistoryViewerComponent } from './review-history/viewer/customer-review-history-viewer.component';
import { CustomerReviewHistoryModule } from './review-history/customer-review-history.module';
import { CustomerOrderHistoryViewer } from './order-history/viewer/customer-order-history-viewer.component';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CustomerProfileComponent } from './profile/profile/customer-profile.component';
import { CustomerProfileModule } from './profile/customer-profile.module';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    CustomerProfileModule,
    RestaurantsModule,
    CustomerOrderHistoryModule,
    CustomerReviewHistoryModule
  ],
  exports: [
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
