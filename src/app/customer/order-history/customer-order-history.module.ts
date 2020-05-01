import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOrderHistoryViewer } from './viewer/customer-order-history-viewer.component';
import { MaterialModule } from '../../core/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CustomerOrderFeedbackComponent } from './feedback/customer-order-feedback.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomerOrderFeedbackComponent,
    CustomerOrderHistoryViewer
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomerOrderHistoryViewer
  ]
})
export class CustomerOrderHistoryModule { }
