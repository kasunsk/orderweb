import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { ProductService } from '../service/product.service';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  loading: boolean;
  products: Product[];
  failUrl: string;
  orderAddUrl: string;
  orderEditUrl:string;

  constructor(private route: ActivatedRoute,
              private router: Router, private alertService: AlertService,
              private productService: ProductService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.loading = false;
    this.products = [];
    this.failUrl = '/';
    this.orderAddUrl = 'product/new';
    this.orderEditUrl = 'product/edit/';
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe(
      data => {
        this.alertService.success('Order successfully retrieved', true);
        console.log(data);
        this.products = data as any;
        this.loading = false;
      },
      error => {
        this.alertService.error(error);
        this.router.navigate([this.failUrl]);
        this.loading = false;
      });
  }

  addNewProduct() {
    this.router.navigate([this.orderAddUrl]);
  }

  editProduct(productId) {
    this.router.navigate([this.orderEditUrl + productId]);
  }

  removeProduct(productId) {

    this.loading = true;
    return this.httpClient.delete(environment.api_url + '/product/' + productId)
      .subscribe(
        data => {
          this.loading = false;
          this.loadProducts();
        },
        err => {
          console.log(err);
          console.log('Error occurred');
          this.loading = false;
        });

  }


}
