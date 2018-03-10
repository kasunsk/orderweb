import {Component, OnInit} from '@angular/core';
import {Product} from "../_models/product";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";
import {ProductService} from "../_services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  loading:false;
  products: Product[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router, private alertService: AlertService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {

    this.productService.getAll()  .subscribe(
      data => {
        this.alertService.success('Order successfully retrieved', true);
        console.log(data);
        this.products = data;
        this.loading = false;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }



}
