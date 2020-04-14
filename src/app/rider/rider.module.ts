import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/material.module';
import { RiderComponent } from './rider.component';
import { RiderOrderComponent } from './rider-order/rider-order.component';
import { RiderSummaryComponent } from './rider-summary/rider-summary.component';
import { PipesModule } from '../pipes/pipes.module';
import { RiderRoutingModule } from './rider-routing.module';
import { RiderProfileComponent } from './rider-profile/rider-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RiderComponent,
    RiderOrderComponent,
    RiderSummaryComponent,
    RiderProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    RiderRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RiderComponent,
    RiderOrderComponent,
    RiderSummaryComponent,
    RiderProfileComponent
  ]
})
export class RiderModule { }
