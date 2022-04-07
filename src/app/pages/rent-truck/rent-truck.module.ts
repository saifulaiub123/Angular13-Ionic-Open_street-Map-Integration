import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentTruckPageRoutingModule } from './rent-truck-routing.module';

import { RentTruckPage } from './rent-truck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RentTruckPageRoutingModule
  ],
  declarations: [RentTruckPage]
})
export class RentTruckPageModule {}
