import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Store } from 'src/app/models/store.model';

@Component({
  selector: 'app-managestore',
  templateUrl: './managestore.component.html',
  styleUrls: ['./managestore.component.scss'],
})
export class ManagestoreComponent implements OnInit {
  stores: Store[] = [];
  selectedStore: Store | undefined;
  newName: string = '';
  newManagerId: string = '';
  newManagerPassword: string = '';
  isEditing: boolean = false; // Add this property
  newStoreName: string = ''; // Add this line
  storemanager:string='';
  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.storeService.getStores().subscribe((data: Store[]) => {
      this.stores = data;
    });

    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('storeId')) {
        const storeId = parseInt(paramMap.get('storeId') as string, 10);
        console.log('Requested ID:', storeId);

        this.storeService.getStoreById(storeId).subscribe((store) => {
          console.log('Found Store:', store);
          this.selectedStore = store;
        });
      }
    });
  }

  callStore(phoneNumber: string) {
    console.log('Calling store with phone number:', phoneNumber);
    // Implement the logic to call the store with the provided phone number
    // You can use your preferred method for making phone calls here
  }

  editStore(storeId: number) {
    this.storeService.getStoreById(storeId).subscribe((store) => {
      if (store) {
        // Update the properties based on the new values
        store.name = this.newName || store.name;
        store.managerid = this.newManagerId || store.managerid;
        store.storemanager = this.newStoreName || store.storemanager; // Update manager name
        store.managerpass = this.newManagerPassword || store.managerpass;
        
        // ... update other properties similarly
  
        this.storeService.updateStore(storeId, store).subscribe(() => {
          console.log(`Store with ID ${storeId} updated successfully.`);
          this.isEditing = false; // Turn off editing mode after update
        });
      }
    });
  }
  

  toggleEdit() {
    this.isEditing = !this.isEditing; // Toggle the editing mode
  }
}
