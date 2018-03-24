import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from './http-client';

@Injectable()
export class AuthenticationService {

  redirectUrl: string;
  showNavigation: boolean;
  showNavigationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.showNavigation);

  constructor(private httpClientService: HttpClientService) {
  }

  login(username: string, password: string): Observable<Response> {
    const url = environment.api_url + '/auth/login';

    return this.httpClientService.post(url, {
      'username': username,
      'password': password
    })
      .map((response: Response) => {
          return response;
        }
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');

    return this.httpClientService.get(environment.api_url + '/auth/logout', null)
      .map((response: Response) => {
        localStorage.removeItem('access-token');
      });
  }
}
