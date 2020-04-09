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
import { RestaurantsViewerComponent } from './users/customer/restaurants-viewer/restaurants-viewer.component';
import { RestaurantMenuViewer } from './users/customer/restaurant-menu-viewer/restaurant-menu-viewer.component';
import { PrettyPipe } from './pipes/pretty.pipe';
import { OrdersViewerComponent } from './users/customer/orders-viewer/orders-viewer.component';
import { OrderFeedbackComponent } from './users/customer/orders-viewer/order-feedback/order-feedback.component';
import { RestaurantOrderPlacerComponent } from './users/customer/restaurant-menu-viewer/restaurant-order-placer/restaurant-order-placer.component';
import { RestaurantViewerComponent } from './users/customer/restaurant-viewer/restaurant-viewer.component';
import { RestaurantReviewsViewerComponent } from './users/customer/restaurant-reviews-viewer/restaurant-reviews-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RiderComponent,
    CustomerComponent,
    RestaurantsViewerComponent,
    RestaurantMenuViewer,
    PrettyPipe,
    OrdersViewerComponent,
    OrderFeedbackComponent,
    RestaurantOrderPlacerComponent,
    RestaurantViewerComponent,
    RestaurantReviewsViewerComponent,
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
