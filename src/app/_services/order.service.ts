import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {environment} from '../../environments/environment';
import {log} from "util";
import {Order} from "../_models/order";

@Injectable()
export class OrderService {

  headers = new Headers({"Content-Type": "application/json"});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }

  getAll() {
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json').set('token',localStorage.getItem("userToken"));
    // return this.http.get<Order[]>(environment.api_url + '/order', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'token': localStorage.getItem("userToken")
    //   }
    // });

    return this.http.get(environment.api_url + '/order', this.options)
      .map((response: Response) => {
      });
  }
}
