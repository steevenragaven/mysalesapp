import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Store } from 'src/app/models/store.model';

@Component({
  selector: 'app-close-store',
  templateUrl: './close-store.component.html',
  styleUrls: ['./close-store.component.scss'],
})
export class CloseStoreComponent implements OnInit {
  stores: Store[]=[]; 
  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStores();
  }

  loadStores() {
    this.storeService.getStores().subscribe((stores) => {
      this.stores = stores;
    });
  }


  closeStore() {
    const storeId = parseInt(this.router.snapshot.params['id'], 10); // Convert to number
    this.storeService.closeStore(storeId).subscribe(() => {
      // Store closed successfully, navigate back to store list
      this.router.navigate(['/admin-dashboard/view-stores']);
    });
  }
  
}
