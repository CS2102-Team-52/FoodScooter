import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/material.module';
import { RiderComponent } from './rider.component';
import { RiderOrderComponent } from './rider-order/rider-order.component';
import { RiderSummaryComponent } from './rider-summary/rider-summary.component';
import { PipesModule } from '../pipes/pipes.module';
import { RiderRoutingModule } from './rider-routing.module';

@NgModule({
  declarations: [
    RiderComponent,
    RiderOrderComponent,
    RiderSummaryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    RiderRoutingModule
  ],
  exports: [
    RiderComponent,
    RiderOrderComponent,
    RiderSummaryComponent
  ]
})
export class RiderModule { }
