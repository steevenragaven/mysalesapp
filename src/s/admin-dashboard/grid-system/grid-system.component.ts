import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-system',
  templateUrl: './grid-system.component.html',
  styleUrls: ['./grid-system.component.scss'],
})
export class GridSystemComponent {
  gridItems = [
    { label: 'View Stores', route: '/view-stores' },
    { label: 'Confirm todays sale', route: '/confirm-sales' },
    { label: 'Manage store', route: '/confirm-sales' },
    { label: 'Add Store', route: '/add-store' },
    { label: 'Close Store', route: '/close-store' },
    { label: 'View Analytics', route: '/view-analytics' },
    
    // Add more grid items for other components
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
