import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staffgrid',
  templateUrl: './staffgrid.component.html',
  styleUrls: ['./staffgrid.component.scss'],
})
export class StaffgridComponent implements OnInit {
  gridItems = [
    { label: 'Add Today\'s Sales', route: '/enter', icon: 'cart-outline', color: 'primary' },
    { label: 'View Sales', route: '/view', icon: 'bar-chart-outline', color: 'secondary' },
    // Add more grid items for other components
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {}
}
