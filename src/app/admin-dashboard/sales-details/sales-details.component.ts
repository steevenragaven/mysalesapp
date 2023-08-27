import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from 'src/app/services/sales-service.service';
import { AlertController } from '@ionic/angular';
import { Sale } from 'src/app/models/sale.model';
import { v4 as uuidv4 } from 'uuid';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.scss'],
})
export class SalesDetailsComponent implements OnInit {
  selectedDate: Date = new Date();
  selectedSales: Sale[] = [];
  storeid: string = ''; // Initialize to null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private salesService: SalesService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      console.log(params.keys); // Log the keys in the params object
      const dateString = params.get('date');
      if (dateString) {
        this.selectedDate = new Date(dateString);
        console.log(`Selected date: ${this.selectedDate.toISOString()}`);
        
        this.loadSalesForDate();
      } else {
        console.log('No date parameter provided.');
      }
  
      const storeIdParam = params.get('storeId');
      if (storeIdParam !== null) {
        this.storeid = storeIdParam;
        console.log(`Store ID: ${this.storeid}`);
      } else {
        console.log('No storeId parameter provided.');
      }
    });
  }
  
  
  loadSalesForDate() {
    const formattedDate = this.selectedDate.toISOString().split('T')[0];
    this.salesService.getSalesForDate(formattedDate).subscribe(
      (salesData: Sale[]) => {
        this.selectedSales = salesData;
      },
      (error) => {
        console.error('Error fetching sales data:', error);
      }
    );
  }

  async confirmSales() {
    const alert = await this.alertController.create({
      header: 'Confirm Sales',
      message: 'Are you sure you want to confirm these sales?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Confirm',
          handler: () => {
            const newId = uuidv4();

            const archiveSales: Sale[] = this.selectedSales.map((sale) => ({
              ...sale,
              id: newId,
            }));

            const totalArchiveSales = archiveSales.reduce((total, sale) => total + sale.total, 0);

            // Remove sales from the current sales endpoint
            for (const sale of this.selectedSales) {
              this.salesService.removeSales(sale.id).subscribe(
                () => {
                  console.log('Sale removed successfully:', sale);
                },
                (error) => {
                  console.error('Error removing sale:', error);
                }
              );
            }

            // Post archiveSales to the /sale endpoint
            this.salesService.archiveSales(archiveSales).subscribe(
              (response) => {
                console.log('Sales archived successfully:', response);
                this.selectedSales = [];

                // Update the store's totalsales
                this.storeService.updateStoreTotalSales(this.storeid, totalArchiveSales).subscribe(
                  (response) => {
                    console.log('Store totalsales updated:', response);
                  },
                  (error) => {
                    console.error('Error updating store totalsales:', error);
                  }
                );
              },
              (error) => {
                console.error('Error archiving sales:', error);
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async removeConfirmedSales() {
    try {
      for (const sale of this.selectedSales) {
        await this.salesService.removeSales(sale.id);
      }
      this.selectedSales = [];
      console.log('Sales removed successfully');
    } catch (error) {
      console.error('Error removing sales:', error);
    }
  }
}
