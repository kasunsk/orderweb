import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from './http-client';

@Injectable()
export class HistoryService {

  constructor(private httpClientService: HttpClientService) {
  }

  getOrderHistory(orderId): Observable<Response> {
    return this.httpClientService.get(environment.api_url + '/order/history/' + orderId, null)
      .map((response: Response) => response);
  }
}
