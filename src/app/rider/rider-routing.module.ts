import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiderComponent } from './rider.component';
import { RiderOrderComponent } from './rider-order/rider-order.component';
import { RiderSummaryComponent } from './rider-summary/rider-summary.component';

const routes: Routes = [
  {path: '', component: RiderComponent, children: [
      {path: 'order', component: RiderOrderComponent},
      {path: 'summary', component: RiderSummaryComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiderRoutingModule { }