import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router) {
  }

  getToken() {
    if (localStorage.getItem('access_token')) {
      return localStorage.getItem('access_token');
    }

    this.router.navigate(['/login']);
    localStorage.removeItem('currentUser');
  }

}
