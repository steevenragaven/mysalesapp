import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Store } from 'src/app/models/store.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss'],
})
export class StoreDetailsComponent implements OnInit {
  selectedCity: string = 'port-louis'; // Default city
  weatherData: any;
  degree: number = 0;
  store: Store | undefined;
  private storeid: number = 0;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private storeService: StoreService
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('storeId')) {
        this.storeid = parseInt(paramMap.get('storeId') as string, 10);
        console.log('Extracted Store ID:', this.storeid);
      }
    });
  }

  ngOnInit() {
    console.log('Requested ID:', this.storeid);
    console.log('All Stores:', this.storeService.getStores());

    this.storeService.getStoreById(this.storeid).subscribe((store) => {
      console.log('Found Store:', store);
      this.store = store;

      if (store && store.location) {
        this.selectedCity = store.location; // Set the selected city for weather
        this.getWeatherForCity(this.selectedCity);
      }
    });
  }

  getWeatherForCity(city: string) {
    this.weatherService.getWeatherByCity(city).subscribe((data) => {
      this.weatherData = data;
      this.calculateTemperatureInCelsius();
    });
  }

  calculateTemperatureInCelsius() {
    if (this.weatherData && this.weatherData.main && this.weatherData.main.temp) {
      this.degree = this.weatherData.main.temp - 273.15;
    }
  }
}
