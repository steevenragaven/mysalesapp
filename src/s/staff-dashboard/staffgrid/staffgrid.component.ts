import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staffgrid',
  templateUrl: './staffgrid.component.html',
  styleUrls: ['./staffgrid.component.scss'],
})
export class StaffgridComponent  implements OnInit {
  
  gridItems = [
    { label: 'Add Todays sales', route: '/entersales' },
    { label: 'Confirm todays sale', route: '/viewsales' },
   
    // Add more grid items for other components
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {  console.log('drf');
  }

}
