import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import {AuthGuard} from './_guards/auth.guard';
import {OrderComponent} from "./order/order.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'order', component: OrderComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
