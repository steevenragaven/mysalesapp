import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { DailySalesComponent } from './daily-sales/daily-sales.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewSalesComponent } from './view-sales/view-sales.component';
import { EditSalesComponent } from './edit-sales/edit-sales.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffgridComponent } from './staffgrid/staffgrid.component';

const routes: Routes = [
  {   path: '',
  component: DashboardComponent,},
 
]

@NgModule({
  declarations: [DailySalesComponent,DashboardComponent,ViewSalesComponent,EditSalesComponent,StaffgridComponent],
  imports: [
    CommonModule,FormsModule,IonicModule,

  ]
})
export class StaffDashboardModule { }
