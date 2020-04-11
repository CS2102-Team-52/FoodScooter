import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './core/app.routing.module';
import { MaterialModule } from './core/material.module';
import { RiderComponent } from './users/rider/rider.component';
import { CustomerModule } from './customer/customer.module';
import { LoginModule } from './login/login.module';
import { PipesModule } from './pipes/pipes.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    RiderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    PipesModule,
    LoginModule,
    CustomerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
