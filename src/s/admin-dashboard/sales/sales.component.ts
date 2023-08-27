import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales-service.service';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  salesSummaries: any[] = []; // Initialize with an empty array

  constructor(private salesService: SalesService, private router: Router) {} // Inject the Router

  ngOnInit(): void {
    this.loadSalesSummaries();
  }

  loadSalesSummaries(): void {
    this.salesService.getSales().subscribe(
      (salesData: any[]) => {
        this.calculateSalesSummaries(salesData);
      },
      (error) => {
        console.error('Error fetching sales data:', error);
      }
    );
  }

  calculateSalesSummaries(salesData: any[]): void {
    this.salesSummaries = salesData.map(entry => ({
      date: entry.date,
      totalSales: this.calculateTotalSales(entry.sales),
      transactions: entry.sales.length,
    }));
  }

  calculateTotalSales(sales: any[]): number {
    return sales.reduce((total, sale) => total + (sale.quantity * sale.price), 0);
  }

  viewSalesDetail(date: string): void {
    this.router.navigate(['/sales-detail', date]);
  }

  updateQuantities(date: string): void {
    // Implement logic to update quantities for the selected date
    // You can access sales data for the selected date from salesSummaries
  }
}
