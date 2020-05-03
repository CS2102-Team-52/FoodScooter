import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FDSManagerComponent} from "./fdsmanager.component";
import {FDSManagerGeneralsummaryComponent} from "./fdsmanager-generalsummary/fdsmanager-generalsummary.component";
import {FDSManagerCustomersummaryComponent} from "./fdsmanager-customersummary/fdsmanager-customersummary.component";
import {FDSManagerLocationsummaryComponent} from "./fdsmanager-locationsummary/fdsmanager-locationsummary.component";
import {FDSManagerRidersummaryComponent} from "./fdsmanager-ridersummary/fdsmanager-ridersummary.component";

const routes: Routes = [
  {
    path: '', component: FDSManagerComponent, children: [
      { path: 'generalsummary', component: FDSManagerGeneralsummaryComponent },
      { path: 'customersummary', component: FDSManagerCustomersummaryComponent },
      { path: 'locationsummary', component: FDSManagerLocationsummaryComponent },
      { path: 'ridersummary', component: FDSManagerRidersummaryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FDSManagerRoutingModule { }
