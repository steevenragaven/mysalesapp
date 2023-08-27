// map.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '../models/store.model';
import { StoreService } from '../services/store.service';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  stores: Store[] = []; // Store array to hold retrieved store data

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.getStoresData(); // Fetch store data
  }

  getStoresData() {
    this.storeService.getStores().subscribe(stores => {
      this.stores = stores;
      this.initMap();
    });
  }

  initMap() {
    const defaultLocation = { lat: -20.348404, lng: 57.552151 };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: defaultLocation
    });

    // Place markers for each store
    this.stores.forEach(store => {
      const location = { lat: store.lat, lng: store.lng };
      const marker = new google.maps.Marker({
        position: location,
        map: map
      });
    });
  }
}
