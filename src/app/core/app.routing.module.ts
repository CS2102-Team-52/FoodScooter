import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiderComponent } from '../users/rider/rider.component';
import { LoginComponent } from '../login/login.component';
import { CustomerComponent } from "../users/customer/customer.component";
import { RestaurantViewer } from "../users/customer/restaurant-viewer/restaurant-viewer.component";
import { MenuViewer } from "../users/customer/menu-viewer/menu-viewer.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'riders/:id', component: RiderComponent},
  {path: 'customers/:id', component: CustomerComponent},
  {path: 'customers/:id/restaurants', component: RestaurantViewer},
  {path: 'customers/:id/restaurants/:restaurantId/menu', component: MenuViewer}
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
