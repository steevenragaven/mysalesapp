import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Import CUSTOM_ELEMENTS_SCHEMA

import { IonIcon, IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common'; 
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module'; // Import the AdminDashboardModule

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreDetailsModule } from './admin-dashboard/store-details/store-details.module';
import { AnalyticsComponent } from './admin-dashboard/analytics/analytics.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StaffDashboardModule } from './staff-dashboard/staff-dashboard.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent,AnalyticsComponent,BarChartComponent  ],
  imports: [AdminDashboardModule,HttpClientModule,BrowserModule,NgApexchartsModule,CommonModule,IonicModule.forRoot(), AppRoutingModule,StoreDetailsModule, StaffDashboardModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
