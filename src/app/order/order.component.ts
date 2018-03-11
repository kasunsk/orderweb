import {Component, OnInit} from '@angular/core';
import {OrderService} from '../_services/order.service';
import {User} from '../_models/user';
import {Order} from '../_models/order';
import {AlertService} from '../_services/alert.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {HistoryService} from "../_services/history.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  currentUser: User;
  loading: boolean;
  orders: Order[];
  historyUrl : string;
  customerUrl : string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private historyService : HistoryService,
              private orderService: OrderService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.loading = false;
    this.orders = [];
    this.getOrders();
    this.historyUrl = 'order/history/';
    this.customerUrl = 'order/customer/';

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getOrders() {
    this.loading = true;
    this.orderService.getAll()
      .subscribe(
        data => {
          this.alertService.success('Order successfully retrieved', true);
          console.log(data);
          this.orders = data;
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  getOrderHistory(orderId) {
    this.router.navigate([this.historyUrl + orderId]);
  }

  getCustomer(customerId) {
    this.router.navigate([this.customerUrl + customerId]);
  }

}
