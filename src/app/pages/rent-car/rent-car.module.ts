import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentCarPageRoutingModule } from './rent-car-routing.module';

import { RentCarPage } from './rent-car.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RentCarPageRoutingModule
  ],
  declarations: [RentCarPage]
})
export class RentCarPageModule {}
