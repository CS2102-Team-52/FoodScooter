import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerReviewHistoryViewerComponent } from "./viewer/customer-review-history-viewer.component";
import { RouterModule } from "@angular/router";
import { MaterialModule } from '../../core/material.module';

@NgModule({
  declarations: [
    CustomerReviewHistoryViewerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    CustomerReviewHistoryViewerComponent
  ]
})
export class CustomerReviewHistoryModule { }
