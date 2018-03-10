import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './_services/authentication.service';
import { AlertService } from './_services/alert.service';
import { AuthGuard } from './_guards/index';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { OrderService } from './_services/order.service';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { HeaderComponent } from './header/header.component';
import { ProductService } from './_services/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { HttpClientModule } from '@angular/common/http';
// import {MatTableModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderComponent,
    ProductComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    NgIdleKeepaliveModule.forRoot(),
    HttpClientModule
    // MatTableModule
  ],
  providers: [AlertService, AuthGuard, AuthenticationService, OrderService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
