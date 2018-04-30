import { Component, OnInit } from '@angular/core';
import { AlertService } from '../service/alert.service';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[];
  loading: boolean;
  userUrl : string;

  constructor(private alertService: AlertService, private userService: UserService, private router: Router,
              private httpClient: HttpClient) {
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

  removeUser(userId) {
    this.loading = true;
    return this.httpClient.delete(environment.api_url + '/user/' + userId)
      .subscribe(
        data => {
          const result = <boolean>data;
          this.loading = false;
          this.getUsers();
        },
        err => {
          console.log(err);
          console.log('Error occurred');
          this.loading = false;
        });
  }

}
