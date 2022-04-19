import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentCarPageRoutingModule } from './rent-car-routing.module';

import { RentCarPage } from './rent-car.page';
import { MapComponent } from 'src/app/component/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RentCarPageRoutingModule
  ],
  exports: [],
  declarations: [RentCarPage,MapComponent]
})
export class RentCarPageModule {}
