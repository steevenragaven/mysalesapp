import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent  implements OnInit {
  salesData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.salesData = [
      {
        name: 'January',
        value: 15000
      },
      {
        name: 'February',
        value: 18000
      },
      // Add data for other months
    ];
  }
}