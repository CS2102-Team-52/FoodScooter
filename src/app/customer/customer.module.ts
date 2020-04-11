import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { MaterialModule } from '../core/material.module';
import { RouterModule } from '@angular/router';
import { RestaurantsViewerComponent } from './restaurants/restaurants-viewer/restaurants-viewer.component';
import { RestaurantViewerComponent } from './restaurants/restaurant-viewer/restaurant-viewer.component';
import { OrderHistoryModule } from './order-history/order-history.module';
import { ReviewsViewerComponent } from './review-history/reviews-viewer/reviews-viewer.component';
import { ReviewHistoryModule } from './review-history/review-history.module';
import { OrdersViewerComponent } from './order-history/orders-viewer/orders-viewer.component';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CustomerProfileComponent } from './profile/customer-profile/customer-profile.component';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ProfileModule,
    RestaurantsModule,
    OrderHistoryModule,
    ReviewHistoryModule
  ],
  exports: [
    CustomerComponent,
    CustomerProfileComponent,
    RestaurantsViewerComponent,
    RestaurantViewerComponent,
    OrdersViewerComponent,
    ReviewsViewerComponent
  ]
})
export class CustomerModule { }
