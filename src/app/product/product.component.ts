import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  loading: boolean;
  products: Product[];
  failUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router, private alertService: AlertService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.loading = false;
    this.products = [];
    this.failUrl = '/';
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe(
      data => {
        this.alertService.success('Order successfully retrieved', true);
        console.log(data);
        this.products = data;
        this.loading = false;
      },
      error => {
        this.alertService.error(error);
        this.router.navigate([this.failUrl]);
        this.loading = false;
      });
  }


}
