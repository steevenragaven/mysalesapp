import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherComponent implements OnInit {
  selectedCity: string = 'port-louis';
  weatherData: any;
  degree: number = 0; // Initializing to 0

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather(this.selectedCity);
  }

  getWeather(city: string) {
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
  getWeatherIconClass() {
    const weatherCondition = this.weatherData.weather[0].main.toLowerCase();
    let iconClass = '';
  
    switch (weatherCondition) {
      case 'clear':
        iconClass = 'fas fa-sun'; // Add FontAwesome class for a sun icon
        break;
      case 'clouds':
        iconClass = 'fas fa-cloud'; // Add FontAwesome class for a cloud icon
        break;
      case 'rain':
        iconClass = 'fas fa-cloud-rain'; // Add FontAwesome class for a rain icon
        break;
      // Add more cases for other weather conditions
      default:
        iconClass = 'fas fa-question'; // Default to a question mark icon
    }
  
    return iconClass;
  }
  
}
