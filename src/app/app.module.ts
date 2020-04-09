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
import { RestaurantViewer } from './users/customer/restaurants-viewer/restaurant-viewer.component';
import { MenuViewer } from './users/customer/menu-viewer/menu-viewer.component';
import { PrettyPipe } from './pipes/pretty.pipe';
import { OrdersViewerComponent } from './users/customer/orders-viewer/orders-viewer.component';
import { OrderFeedbackComponent } from './users/customer/orders-viewer/order-feedback/order-feedback.component';
import { OrderPlacerComponent } from './users/customer/menu-viewer/order-placer/order-placer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RiderComponent,
    CustomerComponent,
    RestaurantViewer,
    MenuViewer,
    PrettyPipe,
    OrdersViewerComponent,
    OrderFeedbackComponent,
    OrderPlacerComponent,
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
