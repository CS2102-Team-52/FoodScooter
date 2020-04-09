import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiderComponent } from '../users/rider/rider.component';
import { LoginComponent } from '../login/login.component';
import { CustomerComponent } from "../users/customer/customer.component";
import { RestaurantsViewerComponent } from "../users/customer/restaurants-viewer/restaurants-viewer.component";
import { RestaurantViewerComponent } from "../users/customer/restaurant-viewer/restaurant-viewer.component";
import { OrdersViewerComponent } from "../users/customer/orders-viewer/orders-viewer.component";
import { OrderFeedbackComponent } from "../users/customer/orders-viewer/order-feedback/order-feedback.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'riders/:id', component: RiderComponent},
  {path: 'customers/:customerId', component: CustomerComponent},
  {path: 'customers/:customerId/restaurants', component: RestaurantsViewerComponent},
  {path: 'customers/:customerId/restaurants/:restaurantId', component: RestaurantViewerComponent},
  {path: 'customers/:customerId/orders', component: OrdersViewerComponent},
  {path: 'customers/:customerId/orders/:orderId/review', component: OrderFeedbackComponent}
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
