import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import {AuthGuard} from './_guards/auth.guard';
import {OrderComponent} from "./order/order.component";
import {ProductComponent} from "./product/product.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'order', component: OrderComponent },
  {path: 'product', component: ProductComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
