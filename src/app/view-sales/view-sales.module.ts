import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSalesComponent } from './view-sales/view-sales.component';
import { CommonModule } from '@angular/common'; // Import CommonModule

const routes: Routes = [
  {
    path: '',
    component: ViewSalesComponent,
  },
  // Add more routes for the view sales module if needed
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations:[ViewSalesComponent]
})
export class ViewSalesModule {}
