import { Component, OnInit } from '@angular/core';
import {AlertService} from "../_services/alert.service";
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users : User[] = [];
  loading : boolean;

  constructor(private alertService:AlertService, private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getAll()
      .subscribe(
        data => {
          this.alertService.success('Order successfully retrieved', true);
          console.log(data);
          this.users = data;
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
