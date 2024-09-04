import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagBloquesPage } from './pag-bloques.page';

const routes: Routes = [
  {
    path: '',
    component: PagBloquesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagBloquesPageRoutingModule {}
