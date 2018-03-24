import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../service/index';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading: boolean;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loading = false;
    this.returnUrl = '/order';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        response => {
          // store logged in user after a successful login
          localStorage.setItem('currentUser', (response as any).body.user);
          localStorage.setItem('access-token', (response as any).body.token);

          this.authenticationService.showNavigationSubject.next(true);

          this.loading = false;
          this.router.navigate([this.returnUrl]);
          this.alertService.success('Login Success', true);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
