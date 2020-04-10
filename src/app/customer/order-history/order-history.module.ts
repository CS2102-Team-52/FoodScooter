import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersViewerComponent } from './orders-viewer/orders-viewer.component';
import { MaterialModule } from '../../core/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { OrderFeedbackComponent } from './order-feedback/order-feedback.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OrderFeedbackComponent,
    OrdersViewerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    FormsModule
  ],
  exports: [
    OrdersViewerComponent
  ]
})
export class OrderHistoryModule { }
