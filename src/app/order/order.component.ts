import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { User } from '../_models/user';
import { Order } from '../_models/order';
import { AlertService } from '../_services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  currentUser: User;
  loading: boolean;
  orders: Order[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.loading = false;
    this.orders = [];
    this.getOrders();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getOrders() {
    // this.loading = true;
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

}
