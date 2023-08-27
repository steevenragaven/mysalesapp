import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales-service.service';

@Component({
  selector: 'app-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.scss'],
})
export class ViewSalesComponent implements OnInit {
  salesHistory: any[] = [];
  isEditing: boolean = false;
  selectedSale: any = null;

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadSalesData();
  }

  loadSalesData(): void {
    this.salesService.getSales().subscribe(
      (salesData: any[]) => {
        this.salesHistory = salesData;
        this.salesHistory.forEach(sale => {
          sale.total = sale.sales.reduce((total: number, product: any) => total + product.price * product.quantity, 0);
        });
      },
      (error) => {
        console.error('Error fetching sales data:', error);
      }
    );
  }

  editSale(sale: any): void {
    this.selectedSale = { ...sale };
    this.isEditing = true;
  }

  saveEdit(): void {
    if (this.selectedSale) {
      this.salesService.editSale(this.selectedSale).subscribe(
        (updatedSale: any) => {
          console.log('Sale edited successfully:', updatedSale);
          this.isEditing = false;
          this.selectedSale = null;
          this.loadSalesData(); // Refresh sales data after edit
        },
        (error) => {
          console.error('Error editing sale:', error);
        }
      );
    }
  }

  removeSale(saleId: number): void {
    this.salesService.removeSale(saleId).subscribe(
      () => {
        console.log('Sale removed successfully.');
        this.loadSalesData(); // Refresh sales data after removal
      },
      (error) => {
        console.error('Error removing sale:', error);
      }
    );
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedSale = null;
  }
}
