import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StoreDetailsComponent } from './admin-dashboard/store-details/store-details.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DailySalesComponent } from './staff-dashboard/daily-sales/daily-sales.component';
import { EditSalesComponent } from './staff-dashboard/edit-sales/edit-sales.component';
import { ViewSalesComponent } from './staff-dashboard/view-sales/view-sales.component';
import { DashboardComponent } from './staff-dashboard/dashboard/dashboard.component';
import { SalesDetailsComponent } from './admin-dashboard/sales-details/sales-details.component';

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
    path:'analytics',
component:BarChartComponent  },
  { path: 'view-stores/store/:storeId', component: StoreDetailsComponent }
  ,
  {   path: 'enter',
  component: DailySalesComponent},
  {   path: 'edit',
  component: EditSalesComponent},
  {   path: 'view',
  component: ViewSalesComponent},
  {   path: 'staff',
  component: DashboardComponent},
  { path: 'sales-detail/:date', component: SalesDetailsComponent },

];

@NgModule({
  imports: [
    CommonModule,RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
