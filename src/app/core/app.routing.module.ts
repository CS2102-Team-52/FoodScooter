import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiderComponent } from '../rider/rider.component';
import { LoginComponent } from '../login/login.component';
import { CustomerComponent } from '../customer/customer.component';
import { RestaurantsViewerComponent } from '../customer/restaurants/restaurants-viewer/restaurants-viewer.component';
import { RestaurantViewerComponent } from '../customer/restaurants/restaurant-viewer/restaurant-viewer.component';
import { OrdersViewerComponent } from '../customer/order-history/orders-viewer/orders-viewer.component';
import { OrderFeedbackComponent } from '../customer/order-history/order-feedback/order-feedback.component';
import { ReviewsViewerComponent } from '../customer/review-history/reviews-viewer/reviews-viewer.component';
import { CustomerProfileComponent } from '../customer/profile/customer-profile/customer-profile.component';
import { FDSManagerComponent } from "../fdsmanager/fdsmanager.component";
import { RiderOrderComponent } from '../rider/rider-order/rider-order.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'riders/:id',
  loadChildren: () => import('../rider/rider.module').then(m => m.RiderModule)},
  {path: 'customers/:customerId', component: CustomerComponent},
  {path: 'customers/:customerId/profile', component: CustomerProfileComponent},
  {path: 'customers/:customerId/restaurants', component: RestaurantsViewerComponent},
  {path: 'customers/:customerId/restaurants/:restaurantId', component: RestaurantViewerComponent},
  {path: 'customers/:customerId/orders', component: OrdersViewerComponent},
  {path: 'customers/:customerId/orders/:orderId/reviews', component: OrderFeedbackComponent},
  {path: 'customers/:customerId/reviews', component: ReviewsViewerComponent},
  {path: 'managers/:id', component: FDSManagerComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
