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
    const url = `${environment.api_url}/product/list`;

    return this.httpClientService.get(url, null)
      .map((response: Response) => response.body)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
