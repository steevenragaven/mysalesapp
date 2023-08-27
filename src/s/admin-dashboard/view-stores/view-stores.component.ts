import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Store } from 'src/app/models/store.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-view-stores',
  templateUrl: './view-stores.component.html',
  styleUrls: ['./view-stores.component.scss'],
})
export class ViewStoresComponent implements OnInit {
  stores: Store[] = [];
  selectedStore: Store | undefined;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('storeId')) {
        const storeid = parseInt(paramMap.get('storeId') as string, 10);
        console.log('Requested ID:', storeid);

        this.storeService.getStoreById(storeid).subscribe(store => {
          console.log('Found Store:', store);
          this.selectedStore = store;
          const storeLocation = store?.location ?? ''; // Use the nullish coalescing operator
          this.getWeather(storeLocation);
        });
      }
    });

    this.storeService.getStores().subscribe((data: Store[]) => {
      this.stores = data;
    });
  }

  getWeather(city: string) {
    this.weatherService.getWeatherByCity(city).subscribe((data) => {
      // Handle weather data here
    });
  }

  callStore(phoneNumber: string) {
    // Implement the logic to call the store with the provided phone number
    console.log('Calling store with phone number:', phoneNumber);
  }
}
