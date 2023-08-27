import { v4 as uuidv4 } from 'uuid';
import { Component, OnInit } from '@angular/core';
import { Sale, SaleEntry } from 'src/app/models/sale.model';
import { SalesService } from 'src/app/services/sales-service.service';

@Component({
  selector: 'app-daily-sales',
  templateUrl: './daily-sales.component.html',
  styleUrls: ['./daily-sales.component.scss'],
})
export class DailySalesComponent implements OnInit {

  // Properties for storing sales data
  sales: SaleEntry[] = [];
  newSale: SaleEntry = { product: '', quantity: 0, price: 0 };

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {}

  addSale() {
    // Calculate the total for the new sale
    const total = this.newSale.quantity * this.newSale.price;

    // Add the new sale to the sales array with the calculated total
    this.sales.push({
      product: this.newSale.product,
      quantity: this.newSale.quantity,
      price: this.newSale.price,
    });

    // Reset the newSale object for the next entry
    this.newSale = { product: '', quantity: 0, price: 0 };
  }

  confirmSales() {
    // Calculate the total sale amount by summing up the totals of all sales entries
    let totalSale = 0;
    this.sales.forEach(entry => {
      const entryTotal = entry.quantity * entry.price;
      totalSale += entryTotal;
    });
  
    // Prepare the sales data for sending to the server
    const salesData: Sale = {
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      sales: this.sales,
      total: totalSale, // Assign the calculated totalSale to the total property
    };
  
    // Send the sales data to the server using the addSale() function
    this.salesService.addSale(salesData).subscribe(
      (response) => {
        console.log('Sales submitted:', response);
  
        // Clear the entered sales after successful submission
        this.sales = [];
      },
      (error) => {
        console.error('Error submitting sales:', error);
      }
    );
  }
  
}
