import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from "./_services/authentication.service";
import {AlertService} from "./_services/alert.service";
import {AuthGuard} from './_guards/index';
import {routing} from './app.routing';
import {FormsModule} from "@angular/forms";
import {OrderService} from "./_services/order.service";
import {OrderComponent} from "./order/order.component";
import { ProductComponent } from './product/product.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // HttpClientModule,
    OrderComponent,
    ProductComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [AlertService,AuthGuard, AuthenticationService, OrderService],
  bootstrap: [AppComponent, LoginComponent]
})
export class AppModule { }
