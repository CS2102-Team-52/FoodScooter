import {NgModule}  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RiderComponent} from '../rider/rider.component';
import {LoginComponent} from '../login/login.component';
const routes: Routes = [
  { path: 'rider', component: RiderComponent },
  { path: 'login', component: LoginComponent },
  {path : '', component : LoginComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }