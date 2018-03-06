import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import {AuthGuard} from "./_guards/auth.guard";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
