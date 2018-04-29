import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../service/order.service";
import {Order} from "../models/order";
import {AlertService} from "../service/alert.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.scss']
})
export class OrderUpdateComponent implements OnInit {

  private sub: any;
  orderId:number;
  loading:boolean;
  order:Order;
  availableStatus: string [];
  availablePaymentTypes: string[];
  availablePaymentStatus: string[];

  constructor(private route: ActivatedRoute, private orderService: OrderService,private alertService: AlertService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.orderId = +params['orderId']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    this.loadOrder(this.orderId);
    this.loadAvailableOrderStatus();
    this.loadAvailablePaymentTypes();
    this.loadAvailablePaymentStatus();
  }

  updateOrder2() {
    this.loading = true;
    this.orderService.updateOrder(this.order)
      .subscribe(data => {
          this.availablePaymentStatus = data as any;
          this.loading = false;
        }
        , error => {
          this.alertService.error(error);
          console.log(error);
          this.loading = false;
        });
  }

  loadAvailablePaymentStatus() {
    this.loading = true;
    this.orderService.availablePaymentStatus()
      .subscribe(data => {
          this.availablePaymentStatus = data as any;
          this.loading = false;
        }
        , error => {
          this.alertService.error(error);
          console.log(error);
          this.loading = false;
        });
  }

  loadAvailablePaymentTypes() {
    this.loading = true;
    this.orderService.availablePaymentTypes()
      .subscribe(data => {
          this.availablePaymentTypes = data as any;
          this.loading = false;
        }
        , error => {
          this.alertService.error(error);
          console.log(error);
          this.loading = false;
        });
  }

  loadAvailableOrderStatus() {
    this.loading = true;
    this.orderService.availableOrderStatus()
      .subscribe(data => {
          this.availableStatus = data as any;
          this.loading = false;
        }
        , error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

  loadOrder(customerId) {
    this.loading = true;
    this.orderService.getOrder(customerId)
      .subscribe(data => {
          this.order = data as any;
          this.alertService.success('Order successfully retrieved', true);
          this.loading = false;
        }
        , error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  updateOrder() {
      this.loading = true;
      return this.httpClient.put(environment.api_url + '/order', this.order)
        .subscribe(
          data => {
            const result = <Order>data;
            this.order = result;
            this.loading = false;
            // this.router.navigate([this.orderPlacementSuccessUrl + this.orderReference]);
          },
          err => {
            console.log(err);
            console.log('Error occurred');
            this.loading = false;
          });
  }F

}
