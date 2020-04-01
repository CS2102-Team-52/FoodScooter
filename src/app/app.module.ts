import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './core/app.routing.module';
import { MaterialModule } from './core/material.module';
import { LoginComponent } from './login/login.component';
import { RiderComponent } from './users/rider/rider.component';
import { CustomerComponent } from './users/customer/customer.component';
import { CustomerRestaurantViewerComponent } from './users/customer/restaurant-viewer/customer-restaurant-viewer.component';
import { CustomerFoodItemViewerComponent } from './users/customer/food-item-viewer/customer-food-item-viewer.component';
import { PrettyPipe } from './pipes/pretty.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RiderComponent,
    CustomerComponent,
    CustomerRestaurantViewerComponent,
    CustomerFoodItemViewerComponent,
    PrettyPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
