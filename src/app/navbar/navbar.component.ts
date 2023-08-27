import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'; // Import MenuController

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private menu: MenuController) {} // Inject MenuController

  ngOnInit() {}

  // Function to open the side menu
  openMenu() {
    this.menu.enable(true, 'menu'); // Enable the menu with the specified ID
    this.menu.open('menu'); // Open the menu
  }

  // Your existing functions for settings, calling manager, and logout
  goToSettings() {
    // Implement your logic here
  }

  callManager() {
    // Implement your logic here
  }

  logout() {
    // Implement your logic here
  }
}
