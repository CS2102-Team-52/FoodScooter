import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FdsManagerComponent} from "./fds-manager.component";
import {FdsManagerGeneralSummaryComponent} from "./fds-manager-general-summary/fds-manager-general-summary.component";
import {FdsManagerCustomerSummaryComponent} from "./fds-manager-customer-summary/fds-manager-customer-summary.component";
import {FdsManagerLocationSummaryComponent} from "./fds-manager-location-summary/fds-manager-location-summary.component";
import {FdsManagerRiderSummaryComponent} from "./fds-manager-rider-summary/fds-manager-rider-summary.component";

const routes: Routes = [
  {
    path: '', component: FdsManagerComponent, children: [
      { path: 'generalsummary', component: FdsManagerGeneralSummaryComponent },
      { path: 'customersummary', component: FdsManagerCustomerSummaryComponent },
      { path: 'locationsummary', component: FdsManagerLocationSummaryComponent },
      { path: 'ridersummary', component: FdsManagerRiderSummaryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FdsManagerRoutingModule { }
