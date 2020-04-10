import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsViewerComponent } from "./reviews-viewer/reviews-viewer.component";
import { RouterModule } from "@angular/router";
import { MaterialModule } from '../../core/material.module';

@NgModule({
  declarations: [
    ReviewsViewerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    ReviewsViewerComponent
  ]
})
export class ReviewHistoryModule { }
