import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './core/app.routing.module';
import { MaterialModule } from './core/material.module';
import { CustomerModule } from './customer/customer.module';
import { LoginModule } from './login/login.module';
import { PipesModule } from './pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { RiderModule } from './rider/rider.module';
import { FdsManagerModule } from "./fds-manager/fds-manager.module";
import { RestaurantStaffModule } from './restaurant-staff/restaurant-staff.module';

@NgModule({
  declarations: [
    AppComponent
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
    CustomerModule,
    RiderModule,
    FdsManagerModule,
    RestaurantStaffModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
