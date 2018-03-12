import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import {User} from '../_models/user';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  getAll() {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.set('token', localStorage.getItem('userToken'));
    let options = new RequestOptions({headers: headers});

    return this.http.get(environment.api_url + '/user', options)
      .map((response: Response) => {
        // var res = response.json();
        const result = <User[]>response.json();
        return result;
      });
  }
}
