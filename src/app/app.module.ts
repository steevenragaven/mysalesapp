import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { StoreDetailsModule } from './admin-dashboard/store-details/store-details.module';
import { StaffDashboardModule } from './staff-dashboard/staff-dashboard.module';
import { LoginComponent } from './login/login.component';
import { AnalyticsComponent } from './admin-dashboard/analytics/analytics.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps'
import { MapComponent } from './map/map.component';
import { NgApexchartsModule } from 'ng-apexcharts';
@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    AnalyticsComponent,
    NavbarComponent
  ],
  imports: [
    NgApexchartsModule,
    GoogleMapsModule,
        BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AdminDashboardModule,
    StoreDetailsModule,
    StaffDashboardModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
     // Include ChartsModule here
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add CUSTOM_ELEMENTS_SCHEMA
})
export class AppModule {}
