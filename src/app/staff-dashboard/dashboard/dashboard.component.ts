import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {
  gridItems = [
    { label: 'Add sales', route: '/enter-sales' },
    { label: 'Manage uncomfirmed sales', route: '/view-sales' },
    
    
    // Add more grid items for other components
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }


  ngOnInit() {console.log('f')}

}