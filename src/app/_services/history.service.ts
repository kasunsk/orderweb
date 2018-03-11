import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {environment} from '../../environments/environment';
import {History} from "../_models/history";

@Injectable()
export class HistoryService {

  constructor(private http: Http) {
  }

  getOrderHistory(orderId) {
    let headers = new Headers({"Content-Type": "application/json"});
    headers.set("token", localStorage.getItem("userToken"));
    let options = new RequestOptions({headers: headers});

    return this.http.get(environment.api_url + '/order/history/' + orderId, options)
      .map((response: Response) => {
        var res = response.json();
        var result = <History[]>response.json();
        return result;
      });
  }
}
