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
// import { OrderComponent } from './order/order.component';
import {OrderService} from "./_services/order.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {OrderComponent} from "./order/order.component";
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // HttpClientModule,
    OrderComponent,
    ProductComponent
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
