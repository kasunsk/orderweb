import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import {AuthenticationService} from "./service/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private idle: Idle, private keepalive: Keepalive, private router: Router,
              authenticationService: AuthenticationService) {
    // sets an idle timeout of 5 seconds.
    idle.setIdle(5);

    // sets a timeout period of 5 seconds. after 110 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(10500);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // Log out of the system after the time out
    idle.onTimeoutWarning.subscribe((countdown) => {
      if (countdown === 1) {
        this.logout();
      }
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    this.reset();
  }

  reset() {
    this.idle.watch();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
