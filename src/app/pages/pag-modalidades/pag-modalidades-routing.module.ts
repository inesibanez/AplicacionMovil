import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagModalidadesPage } from './pag-modalidades.page';

const routes: Routes = [
  {
    path: '',
    component: PagModalidadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagModalidadesPageRoutingModule {}
