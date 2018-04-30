import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  user:User;
  loading: boolean;
  userId: number;
  backUrl:string;
  availableUserRoles:string[];

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loadAvailableRoles();
    this.backUrl = '/user';
    this.user = <User>{};
  }

  loadAvailableRoles() {
    return this.httpClient.get(environment.api_url + '/user/availableRoles')
      .subscribe(
        data => {
          const result = <string[]>data;
          this.availableUserRoles = result;
        },
        err => {
          console.log(err);
          console.log('Error occurred');
          this.loading = false;
        });
  }

  addNewUser() {
    this.loading = true;
    return this.httpClient.post(environment.api_url + '/user', this.user)
      .subscribe(
        data => {
          const result = <number>data;
          this.userId = result;
          this.loading = false;
          this.router.navigate([this.backUrl]);
        },
        err => {
          console.log(err);
          console.log('Error occurred');
          this.loading = false;
        });
  }

  cancel() {
    this.router.navigate([this.backUrl]);
  }

}
