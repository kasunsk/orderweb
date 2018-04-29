import { Component, OnInit } from '@angular/core';
import { AlertService } from '../service/alert.service';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[];
  loading: boolean;
  userUrl : string;

  constructor(private alertService: AlertService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.users = [];
    this.getUsers();
    this.userUrl = 'user/add';
  }

  getUsers() {
    this.loading = true;
    this.userService.getAll()
      .subscribe(
        data => {
          this.alertService.success('Order successfully retrieved', true);
          console.log(data);
          this.users = data.body as any;
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  addNewUser() {
    this.router.navigate([this.userUrl]);
  }

}
