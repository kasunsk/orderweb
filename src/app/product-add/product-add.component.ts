import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../models/product";
import {environment} from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import {ProductService} from "../service/product.service";
import {AlertService} from "../service/alert.service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  product: Product;
  loading: boolean;
  productId:number;
  currencies:string[];
  availableStatus:string[];
  backUrl:string;

  constructor(private route: ActivatedRoute, private productService:ProductService,
              private router: Router, private httpClient: HttpClient, private alertService:AlertService) { }

  ngOnInit() {
    this.backUrl = '/product';
    this.loadCurrencies();
    this.loadAvailableStatus();
    this.product = <Product>{};
  }

  loadCurrencies() {
    this.productService.availableCurencies()
      .subscribe(data => {
          this.currencies = data as any;
        }
        , error => {
          this.alertService.error(error);
        });
  }

  loadAvailableStatus() {
    this.productService.availableProductStatus()
      .subscribe(data => {
          this.availableStatus = data as any;
        }
        , error => {
          this.alertService.error(error);
        });
  }

  addProduct() {
    this.loading = true;
    return this.httpClient.post(environment.api_url + '/product', this.product)
      .subscribe(
        data => {
          const result = <number>data;
          this.productId = result;
          this.loading = false;
          this.router.navigate([this.backUrl]);
        },
        err => {
          console.log(err);
          console.log('Error occurred');
          this.loading = false;
        });
  }

}
