import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor(private httpClientService: HttpClientService) {
  }

  getAll(): Observable<Response> {
    return this.httpClientService.get(environment.api_url + '/product/list', null)
      .map((response: Response) => response);
  }
}
