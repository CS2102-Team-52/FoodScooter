import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsComponent } from './promotions.component';
import { PromotionEditorComponent } from './promotion-editor/promotion-editor.component';
import { MaterialModule } from '../core/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PromotionsComponent,
    PromotionEditorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    PromotionsComponent
  ]
})
export class PromotionsModule { }
