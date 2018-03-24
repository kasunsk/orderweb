import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import {Customer} from '../models/customer';
import { HttpClientService } from './http-client';

@Injectable()
export class CustomerService {

  constructor(private httpClientService: HttpClientService) {
  }

  getCustomerData(customerId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.httpClientService.get(environment.api_url + '/order/customer/' + customerId, {})
      .map((response: Response) => {
        const result = response.json();
        // return result;
      });
  }
}
