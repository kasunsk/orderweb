import { Component, OnDestroy, OnInit } from '@angular/core';
import { History } from '../models/history';
import { HistoryService } from '../service/history.service';
import { AlertService } from '../service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {

  loading: boolean;
  histories: History[] = [];
  orderId: number;
  private sub: any;
  backUrl: string;


  constructor(private historyService: HistoryService, private alertService: AlertService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.orderId = +params['orderId']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    this.backUrl = '';
    this.getOrderHistory(this.orderId);
  }

  getOrderHistory(orderId) {
    this.loading = true;
    this.historyService.getOrderHistory(orderId)
      .subscribe(data => {
          this.histories = data.body as any;
          this.alertService.success('Order successfully retrieved', true);
          this.loading = false;
        }
        , error => {
          this.histories = [];
          this.alertService.error(error);
          this.loading = false;
        });
  }

  backFromHistory() {
    this.router.navigate([this.backUrl]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
