import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerProfileComponent } from './profile/customer-profile/customer-profile.component';
import { RestaurantsViewerComponent } from './restaurants/restaurants-viewer/restaurants-viewer.component';
import { RestaurantViewerComponent } from './restaurants/restaurant-viewer/restaurant-viewer.component';
import { OrdersViewerComponent } from './order-history/orders-viewer/orders-viewer.component';
import { OrderFeedbackComponent } from './order-history/order-feedback/order-feedback.component';
import { ReviewsViewerComponent } from './review-history/reviews-viewer/reviews-viewer.component';

const routes: Routes = [
  {
    path: ':customerId', component: CustomerComponent, children: [
      {path: 'profile', component: CustomerProfileComponent},
      {path: 'restaurants', component: RestaurantsViewerComponent},
      {path: 'restaurants/:restaurantId', component: RestaurantViewerComponent},
      {path: 'orders', component: OrdersViewerComponent},
      {path: 'orders/:orderId/reviews', component: OrderFeedbackComponent},
      {path: 'reviews', component: ReviewsViewerComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
