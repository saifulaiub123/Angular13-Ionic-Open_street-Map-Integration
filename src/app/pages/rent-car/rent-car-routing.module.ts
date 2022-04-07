import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentCarPage } from './rent-car.page';

const routes: Routes = [
  {
    path: '',
    component: RentCarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentCarPageRoutingModule {}
