import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../service/customer.service";
import {Customer} from "../models/customer";
import {AlertService} from "../service/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  backUrl : string;

  constructor(private alertService: AlertService, private customerService: CustomerService,
              private route: ActivatedRoute, private router : Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.customerId = +params['customerId']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    this.backUrl = '';
    this.loading = false;
    this.loadCustomer(this.customerId);
  }

  loadCustomer(customerId) {
    this.loading =true;
    this.customerService.getCustomerData(customerId)
      .subscribe(data => {
          // this.customer = data;
          this.alertService.success('Order successfully retrieved', true);
          this.loading = false;
        }
        , error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  backFromCustomerView() {
    this.router.navigate([this.backUrl]);

  }

}
