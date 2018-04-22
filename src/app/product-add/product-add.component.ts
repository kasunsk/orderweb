import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../models/product";
import {environment} from "../../environments/environment";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  product: Product;
  loading: boolean;
  productId:number;

  constructor(private route: ActivatedRoute,
              private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.product = <Product>{};
  }

  addProduct() {
    this.loading = true;
    return this.httpClient.post(environment.api_url + '/product', this.product)
      .subscribe(
        data => {
          const result = <number>data;
          this.productId = result;
          this.loading = false;
          // this.router.navigate([this.orderPlacementSuccessUrl + this.orderReference]);
        },
        err => {
          console.log(err);
          console.log('Error occurred');
          this.loading = false;
        });
  }

}
