import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  user:User;
  loading: boolean;
  userId: number;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.user = <User>{};
  }

  addNewUser() {
    this.loading = true;
    return this.httpClient.post(environment.api_url + '/user', this.user)
      .subscribe(
        data => {
          const result = <number>data;
          this.userId = result;
          this.loading = false;
          // this.router.navigate([this.orderPlacementSuccessUrl + this.orderReference]);
        },
        err => {
          console.log(err);
          console.log('Error occurred');
          this.loading = false;
        });
  }

}
