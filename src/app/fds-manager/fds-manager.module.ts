import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FdsManagerComponent} from "./fds-manager.component";
import {MaterialModule} from "../core/material.module";
import {PipesModule} from "../pipes/pipes.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FdsManagerGeneralSummaryComponent } from './fds-manager-general-summary/fds-manager-general-summary.component';
import {FdsManagerRoutingModule} from "./fds-manager-routing.module";
import { FdsManagerCustomerSummaryComponent } from './fds-manager-customer-summary/fds-manager-customer-summary.component';
import { FdsManagerLocationSummaryComponent } from './fds-manager-location-summary/fds-manager-location-summary.component';
import { FdsManagerRiderSummaryComponent } from './fds-manager-rider-summary/fds-manager-rider-summary.component';

@NgModule({
  declarations: [
    FdsManagerComponent,
    FdsManagerGeneralSummaryComponent,
    FdsManagerCustomerSummaryComponent,
    FdsManagerLocationSummaryComponent,
    FdsManagerRiderSummaryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    FdsManagerRoutingModule
  ],
  exports: [
    FdsManagerRoutingModule
  ]
})
export class FdsManagerModule { }
