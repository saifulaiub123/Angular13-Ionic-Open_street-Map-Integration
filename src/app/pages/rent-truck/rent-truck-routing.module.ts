import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentTruckPage } from './rent-truck.page';

const routes: Routes = [
  {
    path: '',
    component: RentTruckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentTruckPageRoutingModule {}
