import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-confirm-sales',
  templateUrl: './confirm-sales.component.html',
  styleUrls: ['./confirm-sales.component.scss'],
})
export class ConfirmSalesComponent  implements OnInit {

  stores: Store[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    // Call the method in the StoreService to fetch the stores
    this.storeService.getStores().subscribe(
      (data: Store[]) => {
        this.stores = data;
      },
      (error) => {
        console.error('Error fetching stores:', error);
      }
    );
  }

  callStore(phoneNumber: string) {
    // Implement the logic to call the store with the provided phone number
    console.log('Calling store with phone number:', phoneNumber);
  }
}
