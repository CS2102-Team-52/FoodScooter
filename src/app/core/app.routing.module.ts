import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'customers',
    loadChildren: () => import('../customer/customer.module').then(m => m.CustomerModule)
  },
  {path: 'managers/:id',
    loadChildren: () => import('../fds-manager/fds-manager.module').then(m => m.FdsManagerModule)},
  {
    path: 'riders/:id',
    loadChildren: () => import('../rider/rider.module').then(m => m.RiderModule)
  },
  {
    path: 'staff',
    loadChildren: () => import('../restaurant-staff/restaurant-staff.module').then(m => m.RestaurantStaffModule)
  }
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
