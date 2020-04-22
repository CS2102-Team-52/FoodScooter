import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FDSManagerComponent} from "./fdsmanager.component";
import {FDSManagerGeneralsummaryComponent} from "./fdsmanager-generalsummary/fdsmanager-generalsummary.component";

const routes: Routes = [
  {
    path: '', component: FDSManagerComponent, children: [
      { path: 'generalsummary', component: FDSManagerGeneralsummaryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FDSManagerRoutingModule { }
