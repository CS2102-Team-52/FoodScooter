import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiderComponent } from './rider.component';
import { RiderOrderComponent } from './rider-order/rider-order.component';
import { RiderSummaryComponent } from './rider-summary/rider-summary.component';
import { RiderProfileComponent } from './rider-profile/rider-profile.component';

const routes: Routes = [
  {path: '', component: RiderComponent, children: [
      {path: 'order', component: RiderOrderComponent},
      {path: 'summary', component: RiderSummaryComponent},
      {path: 'profile', component: RiderProfileComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiderRoutingModule { }