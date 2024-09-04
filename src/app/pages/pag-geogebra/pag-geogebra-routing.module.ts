import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagGeogebraPage } from './pag-geogebra.page';

const routes: Routes = [
  {
    path: '',
    component: PagGeogebraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagGeogebraPageRoutingModule {}
