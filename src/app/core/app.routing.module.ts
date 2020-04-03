import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiderComponent } from '../users/rider/rider.component';
import { LoginComponent } from '../login/login.component';
import { CustomerComponent } from "../users/customer/customer.component";
import { RestaurantViewer } from "../users/customer/restaurants-viewer/restaurant-viewer.component";
import { MenuViewer } from "../users/customer/menu-viewer/menu-viewer.component";
import { OrdersViewerComponent } from "../users/customer/orders-viewer/orders-viewer.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'riders/:id', component: RiderComponent},
  {path: 'customers/:customerId', component: CustomerComponent},
  {path: 'customers/:customerId/restaurants', component: RestaurantViewer},
  {path: 'customers/:customerId/restaurants/:restaurantId/menu', component: MenuViewer},
  {path: 'customers/:customerId/orders', component: OrdersViewerComponent}
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
