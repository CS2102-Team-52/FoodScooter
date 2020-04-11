import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../core/material.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    PipesModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
