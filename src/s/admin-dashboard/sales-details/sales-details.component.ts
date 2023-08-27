import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from 'src/app/services/sales-service.service';
import { AlertController } from '@ionic/angular';
import { Sale } from 'src/app/models/sale.model';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.scss'],
})
export class SalesDetailsComponent implements OnInit {
  selectedDate: Date = new Date(); // Initialize with today's date
  selectedSales: Sale[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private salesService: SalesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const dateString = params.get('date');
      if (dateString) {
        this.selectedDate = new Date(dateString);
        this.loadSalesForDate();
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
            // Handle the confirmation action here
            console.log('Sales confirmed');
          },
        },
      ],
    });

    await alert.present();
  }
}
