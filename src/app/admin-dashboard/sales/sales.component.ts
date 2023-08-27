import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from 'src/app/services/sales-service.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  salesSummaries: any[] = [];
  selectedStore: Store | undefined;

  constructor(
    private salesService: SalesService,
    private storeService: StoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['storeId']) {
        const storeId = params['storeId'];
        this.loadSelectedStore(storeId);
      } else {
        console.log('Store ID not found in route parameters.');
      }
    });
  }

  loadSelectedStore(storeId: string): void {
    const numericStoreId = parseInt(storeId, 10);
    this.storeService.getStoreById(numericStoreId).subscribe(
      (store) => {
        this.selectedStore = store;
        console.log('Selected Store:', this.selectedStore);
        this.loadSalesSummaries(numericStoreId);
      },
      (error) => {
        console.error('Error fetching selected store:', error);
      }
    );
  }

  loadSalesSummaries(storeId: number): void {
    this.salesService.getSalesByStoreId(storeId.toString()).subscribe(
      (salesData: any[]) => {
        console.log('Sales Data:', salesData);
        this.salesSummaries = salesData.map((entry) => ({
          date: entry.date,
          storeId:entry.storeid,
          totalSales: this.calculateTotalSales(entry.sales),
          transactions: entry.sales.length,
        }));
      },
      (error) => {
        console.error('Error fetching sales data:', error);
      }
    );
  }

  calculateTotalSales(sales: any[]): number {
    return sales.reduce((total, sale) => total + sale.quantity * sale.price, 0);
  }
}
