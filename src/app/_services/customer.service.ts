import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import {Customer} from "../_models/customer";

@Injectable()
export class CustomerService {

  constructor(private http: Http) {
  }

  getCustomerData(customerId) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.set('token', localStorage.getItem('userToken'));
    let options = new RequestOptions({headers: headers});

    return this.http.get(environment.api_url + '/order/customer/' + customerId, options)
      .map((response: Response) => {
        const result = <Customer>response.json();
        return result;
      });
  }
}
