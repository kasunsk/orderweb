import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {

  constructor(private httpClientService: HttpClientService) {
  }

  getAll(): Observable<Response> {
    const url = `${environment.api_url}/order`;

    return this.httpClientService.get(url, null)
      .map((response: Response) => response.body)
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateOrder(order) {
    return this.httpClientService.put(environment.api_url + '/order', order)
      .map((response: Response) => response.body)
      .catch((error: any) => Observable.throw(error.json()));
  }

  getOrder(orderId) {
    return this.httpClientService.get(environment.api_url + '/order/get/' + orderId, null)
      .map((response: Response) => response.body)
      .catch((error: any) => Observable.throw(error.json()));
  }

  availableOrderStatus() {
    return this.httpClientService.get(environment.api_url + '/order/get/status', null)
      .map((response: Response) => response.body)
      .catch((error: any) => Observable.throw(error.json()));
  }

  availablePaymentStatus() {
    return this.httpClientService.get(environment.api_url + '/order/get/payment/status', null)
      .map((response: Response) => response.body)
      .catch((error: any) => Observable.throw(error.json()));
  }

  availablePaymentTypes() {
    return this.httpClientService.get(environment.api_url + '/order/get/payment/type', null)
      .map((response: Response) => response.body)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
