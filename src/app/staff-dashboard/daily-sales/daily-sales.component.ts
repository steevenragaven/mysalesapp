import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Sale, SaleEntry } from 'src/app/models/sale.model';
import { SalesService } from 'src/app/services/sales-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-daily-sales',
  templateUrl: './daily-sales.component.html',
  styleUrls: ['./daily-sales.component.scss'],
})
export class DailySalesComponent implements OnInit {
  sales: SaleEntry[] = [];
  newSale: SaleEntry = { product: '', quantity: 0, price: 0 };
  loggedInUser: User | undefined;
  isAdmin: boolean = false;
  storeid: string | null = null; // Store the storeid
  loggedInUserId: string | null = null; // Change the type to string | null

  constructor(
    private salesService: SalesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = this.authService.getUserId(); // Get the user's ID
    console.log('Logged in User ID:', this.loggedInUserId);

    if (this.loggedInUserId) {
      // Assuming that the user service or some other source provides the storeid for the logged-in user
      this.storeid = this.loggedInUserId;
    }
  }

  addSale() {
    this.sales.push({
      product: this.newSale.product,
      quantity: this.newSale.quantity,
      price: this.newSale.price,
    });
    this.newSale = { product: '', quantity: 0, price: 0 };
  }

  confirmSales() {
    let totalSale = 0;
    this.sales.forEach((entry) => {
      const entryTotal = entry.quantity * entry.price;
      totalSale += entryTotal;
    });

    const salesData: Sale = {
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      sales: this.sales,
      total: totalSale,
      storeid: this.storeid!, // Include the storeid in the sales data
    };

    console.log('Sales data to be submitted:', salesData); // Log the sales data

    this.salesService.addSale(salesData).subscribe(
      (response) => {
        console.log('Sales submitted:', response);
        this.sales = [];
      },
      (error) => {
        console.error('Error submitting sales:', error);
      }
    );
  }
}
