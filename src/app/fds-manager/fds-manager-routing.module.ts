import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FdsManagerComponent} from "./fds-manager.component";
import {FdsManagerGeneralSummaryComponent} from "./fds-manager-general-summary/fds-manager-general-summary.component";
import {FdsManagerCustomerSummaryComponent} from "./fds-manager-customer-summary/fds-manager-customer-summary.component";
import {FdsManagerLocationSummaryComponent} from "./fds-manager-location-summary/fds-manager-location-summary.component";
import {FdsManagerRiderSummaryComponent} from "./fds-manager-rider-summary/fds-manager-rider-summary.component";
import { FdsManagerPromotionsComponent } from './fds-manager-promotions/fds-manager-promotions.component';

const routes: Routes = [
  {
    path: '', component: FdsManagerComponent, children: [
      { path: 'general-summary', component: FdsManagerGeneralSummaryComponent },
      { path: 'customer-summary', component: FdsManagerCustomerSummaryComponent },
      { path: 'location-summary', component: FdsManagerLocationSummaryComponent },
      { path: 'rider-summary', component: FdsManagerRiderSummaryComponent },
      { path: 'promotions', component: FdsManagerPromotionsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FdsManagerRoutingModule { }
