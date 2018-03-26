import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerService {

  constructor(private httpClientService: HttpClientService) {
  }

  getCustomerData(customerId) {
    return this.httpClientService.get(environment.api_url + '/order/customer/' + customerId, null)
      .map((response: Response) => response.body)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
