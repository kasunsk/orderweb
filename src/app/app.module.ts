import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './service/authentication.service';
import { AlertService } from './service/alert.service';
import { AuthGuard } from './guards/index';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { OrderService } from './service/order.service';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { HeaderComponent } from './header/header.component';
import { ProductService } from './service/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HistoryComponent } from './history/history.component';
import { HistoryService } from './service/history.service';
import { UserComponent } from './user/user.component';
import { UserService } from './service/user.service';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './service/customer.service';
import { TokenInterceptor } from './interceptor/tokenInterceptor';
import { HttpClientService } from './service/http-client';
import { AuthService } from './service/auth.service';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderComponent,
    ProductComponent,
    HeaderComponent,
    HomeComponent,
    HistoryComponent,
    UserComponent,
    CustomerComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgIdleKeepaliveModule.forRoot(),
    HttpClientModule
  ],
  providers: [AlertService, AuthGuard, AuthenticationService, AuthService, OrderService, ProductService, HistoryService,
    UserService, CustomerService, HttpClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
