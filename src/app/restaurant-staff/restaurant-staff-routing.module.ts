import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantStaffComponent } from './restaurant-staff.component';
import { RestaurantMenuComponent } from './menu/restaurant-menu.component';
import { RestaurantPromotionsComponent } from './promotions/restaurant-promotions.component';
import { RestaurantStaffSpringBoardComponent } from './restaurant-staff-spring-board.component';

const routes: Routes = [
  {
    path: ':staffId', component: RestaurantStaffSpringBoardComponent, children: [
      {
        path: 'restaurants/:restaurantId', component: RestaurantStaffComponent, children: [
          {path: 'menu', component: RestaurantMenuComponent},
          {path: 'promotions', component: RestaurantPromotionsComponent}
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
