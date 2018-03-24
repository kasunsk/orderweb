import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

@Injectable()
export class ProductService {

  constructor(private http: Http) {
  }

  getAll() {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.set('token', localStorage.getItem('userToken'));
    let options = new RequestOptions({headers: headers});

    return this.http.get(environment.api_url + '/product/list', options)
      .map((response: Response) => {
        // var res = response.json();
        const result = <Product[]>response.json();
        return result;
      });
  }
}
