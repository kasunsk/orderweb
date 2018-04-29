import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { CustomerComponent } from './customer/customer.component';
import { HistoryComponent } from './history/history.component';
import { AuthGuard } from './guards/auth.guard';
import {ProductAddComponent} from "./product-add/product-add.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {OrderUpdateComponent} from "./order-update/order-update.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'order/history/:orderId', component: HistoryComponent, canActivate: [AuthGuard]},
  {path: 'order/customer/:customerId', component: CustomerComponent, canActivate: [AuthGuard]},
  {path: 'order/update/:orderId', component : OrderUpdateComponent, canActivate: [AuthGuard]},
  {path: 'product', component: ProductComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path:'product/new', component: ProductAddComponent, canActivate: [AuthGuard]},
  {path: 'user/add', component:UserCreateComponent, canActivate:[AuthGuard]},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
