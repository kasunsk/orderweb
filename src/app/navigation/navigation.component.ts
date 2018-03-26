import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  showNavigation: boolean;
  addSubscription: any = {};

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.addSubscription.showNavigationSubject = this.authenticationService.showNavigationSubject.subscribe(showNavigation => {
      if (!localStorage.getItem('currentUser')) {
        this.showNavigation = showNavigation;
      } else {
        this.showNavigation = true;
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    localStorage.clear();
    this.router.navigate(['/login']);
    this.authenticationService.showNavigationSubject.next(false);
  }

  ngOnDestroy(): void {
    this.addSubscription.unsubscribe();
  }

}
