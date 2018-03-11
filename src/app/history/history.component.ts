import {Component, OnDestroy, OnInit} from '@angular/core';
import {History} from "../_models/history";
import {HistoryService} from "../_services/history.service";
import {AlertService} from "../_services/alert.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {

  loading: boolean;
  histories: History[] = [];
  orderId : number;
  private sub: any;


  constructor(private historyService:HistoryService, private alertService:AlertService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.orderId = +params['orderId']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    this.loading = false;
    this.getOrderHistory(this.orderId);
  }

  getOrderHistory(orderId) {
    this.historyService.getOrderHistory(orderId)
      .subscribe(data => {
          this.histories = data;
          this.alertService.success('Order successfully retrieved', true);
          this.loading =false;
        }
        , error => {
          this.histories = [];
          this.alertService.error(error);
          this.loading=false;
        })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
