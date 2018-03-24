import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'product.lk';
  showNavigation: boolean;
  addSubscription: any = {};

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.addSubscription.showNavigationSubject = this.authenticationService.showNavigationSubject.subscribe(showNavigation => {
      this.showNavigation = showNavigation;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.authenticationService.showNavigationSubject.next(false);
  }

  ngOnDestroy(): void {
    this.addSubscription.unsubscribe();
  }

}
