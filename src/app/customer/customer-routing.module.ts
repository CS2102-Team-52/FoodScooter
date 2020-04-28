import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerProfileComponent } from './profile/profile/customer-profile.component';
import { RestaurantsViewerComponent } from './restaurants/restaurants-viewer/restaurants-viewer.component';
import { RestaurantViewerComponent } from './restaurants/restaurant-viewer/restaurant-viewer.component';
import { CustomerOrderHistoryViewer } from './order-history/viewer/customer-order-history-viewer.component';
import { CustomerOrderFeedbackComponent } from './order-history/feedback/customer-order-feedback.component';
import { CustomerReviewHistoryViewerComponent } from './review-history/viewer/customer-review-history-viewer.component';

const routes: Routes = [
  {
    path: ':customerId', component: CustomerComponent, children: [
      {path: 'profile', component: CustomerProfileComponent},
      {path: 'restaurants', component: RestaurantsViewerComponent},
      {path: 'restaurants/:restaurantId', component: RestaurantViewerComponent},
      {path: 'orders', component: CustomerOrderHistoryViewer},
      {path: 'orders/:orderId/reviews', component: CustomerOrderFeedbackComponent},
      {path: 'reviews', component: CustomerReviewHistoryViewerComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
