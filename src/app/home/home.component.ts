import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  activeTab: string;

  constructor() { }

  ngOnInit() {
    this.activeTab = 'order';
  }

}
