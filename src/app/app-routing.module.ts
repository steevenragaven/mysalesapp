import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StoreDetailsComponent } from './admin-dashboard/store-details/store-details.component';
import { DailySalesComponent } from './staff-dashboard/daily-sales/daily-sales.component';
import { EditSalesComponent } from './staff-dashboard/edit-sales/edit-sales.component';
import { ViewSalesComponent } from './staff-dashboard/view-sales/view-sales.component';
import { DashboardComponent } from './staff-dashboard/dashboard/dashboard.component';
import { SalesDetailsComponent } from './admin-dashboard/sales-details/sales-details.component';
import { LoginComponent } from './login/login.component';
import { StaffgridComponent } from './staff-dashboard/staffgrid/staffgrid.component';
import { SalesComponent } from './admin-dashboard/sales/sales.component';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
 
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
  },
  {
    path: '',
    redirectTo: 'view',
    pathMatch: 'full'
  },
  
  {
    path: 'staff-dashboard/:storeId', // New path for staff dashboard
    component: StaffgridComponent, // New component for staff dashboard
  },
  {
    path: 'map', // New path for staff dashboard
    component: MapComponent, // New component for staff dashboard
  },
  { path: 'view-stores/store/:storeId', component: StoreDetailsComponent },
  { path: 'view-sales/sale/:storeId', component: SalesComponent }
  ,
  {   path: 'enter',
  component: DailySalesComponent},
  {   path: 'edit',
  component: EditSalesComponent},
  {   path: 'view',
  component: ViewSalesComponent},
  {   path: 'login',
  component: LoginComponent},
  {   path: 'staff',
  component: DashboardComponent},
  { path: 'sales-detail/:date/:storeId', component: SalesDetailsComponent },
  { path: 'navbar', component: NavbarComponent },

];

@NgModule({
  imports: [
    CommonModule,RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
