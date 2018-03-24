import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { User } from '../models/user';
import { Order } from '../models/order';
import { AlertService } from '../service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../service/history.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  currentUser: User;
  loading: boolean;
  orders: Order[];
  historyUrl: string;
  customerUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private historyService: HistoryService,
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
          console.log(data);
          this.orders = (data as any).body;
          this.loading = false;
          this.alertService.success('Order successfully retrieved', true);
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
