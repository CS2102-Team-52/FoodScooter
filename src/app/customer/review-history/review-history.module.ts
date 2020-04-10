import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsViewerComponent } from "./reviews-viewer/reviews-viewer.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    ReviewsViewerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ReviewsViewerComponent
  ]
})
export class ReviewHistoryModule { }
