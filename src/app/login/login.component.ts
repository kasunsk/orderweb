import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  selector: 'login-root',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    console.log('test');
    this.returnUrl = '/order';
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/order';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {

          const currentUser = localStorage.getItem('currentUser');
          this.alertService.success('Login Success', true);
          if (currentUser) {
            this.router.navigate([this.returnUrl]);
          }
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
