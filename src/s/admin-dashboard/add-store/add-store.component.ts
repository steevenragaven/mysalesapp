import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Store } from 'src/app/models/store.model';
import { AlertController } from '@ionic/angular'; // Import AlertController

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss'],
})
export class AddStoreComponent implements OnInit {
  newStore: Store = {
    id: '',
    name: '',
    location: '',
    logo: '',
    phoneNumber: '',
    // Adjusted to 'address'
  };

  constructor(
    private storeService: StoreService,
    private alertController: AlertController // Inject AlertController
  ) {}

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Success',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  addNewStore() {
    this.storeService.addStore(this.newStore).subscribe(
      (response) => {
        if (response.success) {
          // Show a success message
          this.presentAlert('Store created successfully!');
        } else {
          // Show an error message
          this.presentAlert('Error creating store. Please try again.');
        }
      },
      (error) => {
        // Show an error message
        this.presentAlert('An error occurred. Please try again later.');
      }
    );
  }

  ngOnInit() {}
}
