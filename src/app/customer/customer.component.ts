import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../_services/customer.service";
import {Customer} from "../_models/customer";
import {AlertService} from "../_services/alert.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  loading : boolean;
  customer : Customer;
  customerId : number;
  private sub: any;

  constructor(private alertService: AlertService, private customerService: CustomerService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.customerId = +params['customerId']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    this.loading = false;
    this.loadCustomer(this.customerId);
  }

  loadCustomer(customerId) {
    this.loading =true;
    this.customerService.getCustomerData(customerId)
      .subscribe(data => {
          this.customer = data;
          this.alertService.success('Order successfully retrieved', true);
          this.loading =false;
        }
        , error => {
          this.alertService.error(error);
          this.loading=false;
        })
  }

}
