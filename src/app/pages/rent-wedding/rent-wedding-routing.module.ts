import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentWeddingPage } from './rent-wedding.page';

const routes: Routes = [
  {
    path: '',
    component: RentWeddingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentWeddingPageRoutingModule {}
