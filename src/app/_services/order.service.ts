import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {environment} from '../../environments/environment';
import {Order} from "../_models/order";

@Injectable()
export class OrderService {

  headers = new Headers({"Content-Type": "application/json"});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }

  getAll() {
    let headers = new Headers({"Content-Type": "application/json"});
    headers.set("token", localStorage.getItem("userToken"));
    let options = new RequestOptions({headers: headers});

    return this.http.get(environment.api_url + '/order', options)
      .map((response: Response) => {
      var res = response.json();
      var result = <Order[]>response.json();
      return result;
      });
  }
}
