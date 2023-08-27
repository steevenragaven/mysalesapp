import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Store } from 'src/app/models/store.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-close-store',
  templateUrl: './close-store.component.html',
  styleUrls: ['./close-store.component.scss'],
})
export class CloseStoreComponent implements OnInit {
  stores: Store[] = [];

  constructor(
    private storeService: StoreService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadStores();
  }

  loadStores() {
    this.storeService.getStores().subscribe((stores) => {
      this.stores = stores;
    });
  }

  async closeStore(store: Store) {
    const alert = await this.alertController.create({
      header: 'Confirm Closure',
      message: `Are you sure you want to close ${store.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Close',
          handler: () => {
            this.storeService.closeStore(store.id).subscribe(() => {
              // Store closed successfully, reload the list of stores
              this.loadStores();
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
