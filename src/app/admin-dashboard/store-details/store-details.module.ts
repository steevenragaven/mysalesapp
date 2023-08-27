import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDetailsRoutingModule } from './store-details-routing.module'; // Import the routing module
import { StoreDetailsComponent } from './store-details.component'; // Import the component
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [StoreDetailsComponent],
  imports: [CommonModule, StoreDetailsRoutingModule], // Add the routing module here
  schemas: [CUSTOM_ELEMENTS_SCHEMA],})
export class StoreDetailsModule {}
