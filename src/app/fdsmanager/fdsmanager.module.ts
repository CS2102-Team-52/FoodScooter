import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FDSManagerComponent} from "./fdsmanager.component";
import {MaterialModule} from "../core/material.module";
import {PipesModule} from "../pipes/pipes.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FDSManagerGeneralsummaryComponent } from './fdsmanager-generalsummary/fdsmanager-generalsummary.component';
import {FDSManagerRoutingModule} from "./fdsmanager-routing.module";
import { FDSManagerCustomersummaryComponent } from './fdsmanager-customersummary/fdsmanager-customersummary.component';
import { FDSManagerLocationsummaryComponent } from './fdsmanager-locationsummary/fdsmanager-locationsummary.component';
import { FDSManagerRidersummaryComponent } from './fdsmanager-ridersummary/fdsmanager-ridersummary.component';



@NgModule({
  declarations: [
    FDSManagerComponent,
    FDSManagerGeneralsummaryComponent,
    FDSManagerCustomersummaryComponent,
    FDSManagerLocationsummaryComponent,
    FDSManagerRidersummaryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    FDSManagerRoutingModule
  ],
  exports: [
    FDSManagerComponent,
    FDSManagerGeneralsummaryComponent
  ]
})
export class FDSManagerModule { }
