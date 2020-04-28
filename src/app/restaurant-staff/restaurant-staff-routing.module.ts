import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantStaffComponent } from './restaurant-staff.component';

const routes: Routes = [
  {
    path: ':staffId', component: RestaurantStaffComponent, children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantStaffRoutingModule { }
