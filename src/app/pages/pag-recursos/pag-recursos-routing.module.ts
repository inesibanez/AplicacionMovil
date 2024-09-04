import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagRecursosPage } from './pag-recursos.page';

const routes: Routes = [
  {
    path: '',
    component: PagRecursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagRecursosPageRoutingModule {}
