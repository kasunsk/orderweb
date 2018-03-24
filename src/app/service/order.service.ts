import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client';

@Injectable()
export class OrderService {

  constructor(private httpClientService: HttpClientService) {
  }

  getAll() {

    return this.httpClientService.get(environment.api_url + '/order', null)
      .map((response: Response) => {
        return response;
      });

    // return this.http.get(environment.api_url + '/order', options)
    //   .map((response: Response) => {
    //     var res = response.json();
    //     var result = <Order[]>response.json();
    //     return result;
    //   });
  }
}
