import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './_auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './dashboard/main/main.component';
import { ShippingGoodsComponent } from './dashboard/shipping-goods/shipping-goods.component';
import { ShipmentComponent } from './dashboard/shipment/shipment.component';
import { GoodsComponent } from './dashboard/goods/goods.component';
import { UsersComponent } from './dashboard/users/users.component';
import { AddUsersComponent } from './dashboard/users/add-users/add-users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'EXPORTER'], breadcrumb: 'ADMIN' },
    children: [
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: 'shipmentGoods',
        component: ShippingGoodsComponent,
      },
      {
        path: 'shipments',
        component: ShipmentComponent,
      },
      {
        path: 'goods',
        component: GoodsComponent,
      },
      {
        path: 'user',
        component: UsersComponent,
        children: [{ path: 'add-user', component: AddUsersComponent }],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'addShipment',
    component: ShippingGoodsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
