import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerProfileComponent } from './profile/customer-profile.component';
import { MaterialModule } from '../../core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CustomerProfileComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        PipesModule,
        ReactiveFormsModule
    ],
  exports: [
    CustomerProfileComponent
  ]
})
export class CustomerProfileModule { }
