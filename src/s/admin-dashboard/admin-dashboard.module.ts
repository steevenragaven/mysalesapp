import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GridSystemComponent } from './grid-system/grid-system.component';
import { ViewStoresComponent } from './view-stores/view-stores.component';
import { AddStoreComponent } from './add-store/add-store.component';
import { CloseStoreComponent } from './close-store/close-store.component';
import { ViewAnalyticsComponent } from './view-analytics/view-analytics.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { IonicModule } from '@ionic/angular'; // Import IonicModule to use Ionic components
import { StoreService } from '../services/store.service';
import { ConfirmSalesComponent } from './confirm-sales/confirm-sales.component';
import { FormsModule } from '@angular/forms';
import { SalesComponent } from './sales/sales.component';
import { SalesDetailsComponent } from './sales-details/sales-details.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { WeatherComponent } from './weather/weather-widget.component';
// import { WeatherComponent } from './weather/weather-widget.component';

const routes: Routes = [
 
  {   path: '',
  component: AdminDashboardComponent,},
  {
    path: 'grid',
    component: GridSystemComponent,
  },
  // {
  //   path: 'weather',
  //   component: WeatherComponent,
  // },
  {
    path:'analytics',
component:AnalyticsComponent  },
  {
    path: 'confirm-sales',
    component: ConfirmSalesComponent,
  },
  {
    path: 'view-stores',
    component: ViewStoresComponent,
    
  },
  {
    path: 'add-store',
    component: AddStoreComponent,
  },
  {
    path: 'close-store',
    component: CloseStoreComponent,
  },
  {
    path: 'view-analytics',
    component: AnalyticsComponent,
  },
  {
    path: 'sales-details',
    component: SalesDetailsComponent,
  },
  {
    path: 'sales',
    component: SalesComponent,
  
},
{
  path: 'weathers',
  component: WeatherComponent,
},
];

@NgModule({
   declarations: [GridSystemComponent,AdminDashboardComponent,ViewStoresComponent,ConfirmSalesComponent,SalesDetailsComponent,CloseStoreComponent,AddStoreComponent,SalesComponent,WeatherComponent],
  imports: [FormsModule,CommonModule, RouterModule.forChild(routes),IonicModule],
  exports: [RouterModule],
  providers: [StoreService], // Provide the StoreService

})
export class AdminDashboardModule {}
