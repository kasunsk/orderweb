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

  private sub: any;
  product: Product;
  loading: boolean;
  productId:number;
  currencies:string[];
  availableStatus:string[];
  backUrl:string;
  editMood: boolean = false;

  constructor(private route: ActivatedRoute, private productService:ProductService,
              private router: Router, private httpClient: HttpClient, private alertService:AlertService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.productId = +params['productId']; // (+) converts string 'id' to a number
    });

    if (!isNaN(this.productId)) {
      this.editMood = true;
      this.loadProduct(this.productId);
    }


    this.backUrl = '/product';
    this.loadCurrencies();
    this.loadAvailableStatus();

    if (!this.editMood) {
      this.product = <Product>{};
    }
  }

  loadProduct(productId) {

    this.loading = true;
    return this.httpClient.get(environment.api_url + '/product/load/' + productId)
      .subscribe(
        data => {
          const result = <Product>data;
          this.product = result;
          this.loading = false;
        },
        err => {
          console.log(err);
          console.log('Error occurred');
          this.loading = false;
        });
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

  addOrUpdateProduct() {

    if (this.editMood) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
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


  updateProduct() {
    this.loading = true;
    return this.httpClient.put(environment.api_url + '/product', this.product)
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

  cancel() {
    this.router.navigate([this.backUrl]);
  }

}
