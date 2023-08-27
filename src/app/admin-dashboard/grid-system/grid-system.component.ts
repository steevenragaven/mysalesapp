import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-system',
  templateUrl: './grid-system.component.html',
  styleUrls: ['./grid-system.component.scss'],
})
export class GridSystemComponent {
// grid-system.component.ts
gridItems = [
  { label: 'View Stores', route: '/view-stores', icon: 'storefront' },
  { label: 'Confirm todays sale', route: '/confirm-sales', icon: 'cash' },
  { label: 'Manage store', route: '/manage-store', icon: 'settings' },
  { label: 'Add Store', route: '/add-store', icon: 'add-circle' },
  { label: 'Close Store', route: '/close-store', icon: 'close-circle' },
  // Add more grid items for other components
];


  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
