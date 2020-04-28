import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOrderHistoryViewer } from './viewer/customer-order-history-viewer.component';
import { MaterialModule } from '../../core/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CustomerOrderFeedbackComponent } from './feedback/customer-order-feedback.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomerOrderFeedbackComponent,
    CustomerOrderHistoryViewer
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    FormsModule
  ],
  exports: [
    CustomerOrderHistoryViewer
  ]
})
export class CustomerOrderHistoryModule { }
