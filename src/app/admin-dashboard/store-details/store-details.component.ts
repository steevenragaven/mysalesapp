import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Store } from 'src/app/models/store.model';
import { WeatherService } from 'src/app/services/weather.service';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

declare const google: any;

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss'],
})
export class StoreDetailsComponent implements OnInit, AfterViewInit {
  selectedCity: string = 'port-louis'; // Default city
  weatherData: any;
  degree: number = 0;
  store: Store | undefined;
    stores: Store[] = []; // Store array to hold retrieved store data

  private storeid: number = 0;

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private http: HttpClient // Inject HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['storeId']) {
        this.storeid = +params['storeId'];
        console.log('Extracted Store ID:', this.storeid);
        this.fetchStoreDetails();
      } else {
        console.log('Store ID not found in route parameters.');
      }
    });
    this.getStoresData();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  fetchStoreDetails() {
    this.storeService.getStoreById(this.storeid).subscribe(
      (store) => {
        console.log('Found Store:', store);
        this.store = store;

        if (store && store.location) {
          this.selectedCity = store.location; // Set the selected city for weather
          this.getWeatherForCity(this.selectedCity);
        }
      },
      (error) => {
        console.error('Error fetching store details:', error);
      }
    );
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
  
    // Place marker for the store being viewed
    if (this.store) {
      const location = { lat: this.store.lat, lng: this.store.lng };
      const marker = new google.maps.Marker({
        position: location,
        map: map
      });
    }
  }
  updateStoreTotalSales(storeid: number, total: number) {
    const url = `your_backend_url/stores/${storeid}`;
    const updatedStoreData = { totalsales: total };
  
    return this.http.put(url, updatedStoreData);
  }
  
}
