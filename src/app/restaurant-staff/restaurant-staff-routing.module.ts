import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantStaffComponent } from './restaurant-staff.component';
import { RestaurantMenuComponent } from './menu/restaurant-menu.component';
import { RestaurantPromotionsComponent } from './promotions/restaurant-promotions.component';
import { RestaurantStaffSpringBoardComponent } from './restaurant-staff-spring-board.component';
import { RestaurantProfileComponent } from './profile/restaurant-profile.component';
import { RestaurantSummaryComponent } from './summary/restaurant-summary.component';

const routes: Routes = [
  {
    path: ':staffId', component: RestaurantStaffSpringBoardComponent, children: [
      {
        path: 'restaurants/:restaurantId', component: RestaurantStaffComponent, children: [
          {path: 'profile', component: RestaurantProfileComponent},
          {path: 'menu', component: RestaurantMenuComponent},
          {path: 'promotions', component: RestaurantPromotionsComponent},
          {path: 'summary', component: RestaurantSummaryComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantStaffRoutingModule {
}
