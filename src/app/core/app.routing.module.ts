import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiderComponent } from '../users/rider/rider.component';
import { LoginComponent } from '../login/login.component';
import { CustomerComponent } from "../users/customer/customer.component";
import { CustomerRestaurantViewerComponent } from "../users/customer/restaurant-viewer/customer-restaurant-viewer.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'riders/:id', component: RiderComponent},
  {path: 'customers/:id', component: CustomerComponent},
  {path: 'restaurants', component: CustomerRestaurantViewerComponent}
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
