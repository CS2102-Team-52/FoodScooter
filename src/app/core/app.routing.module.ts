import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FDSManagerComponent } from '../fdsmanager/fdsmanager.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'riders/:id',
    loadChildren: () => import('../rider/rider.module').then(m => m.RiderModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('../customer/customer.module').then(m => m.CustomerModule)
  },
  {path: 'managers/:id', component: FDSManagerComponent}
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
export class AppRoutingModule {
}
