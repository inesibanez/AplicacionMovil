import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagActividadPage } from './pag-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: PagActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagActividadPageRoutingModule {}
