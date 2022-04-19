import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentWeddingPageRoutingModule } from './rent-wedding-routing.module';

import { RentWeddingPage } from './rent-wedding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RentWeddingPageRoutingModule
  ],
  declarations: [RentWeddingPage]
})
export class RentWeddingPageModule {}
