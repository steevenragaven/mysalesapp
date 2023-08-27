import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreDetailsComponent } from './store-details.component'; // Make sure to import the StoreDetailsComponent

const routes: Routes = [
  {
    path: ':id', // This will match routes like 'store-details/1'
    component: StoreDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreDetailsRoutingModule {}
