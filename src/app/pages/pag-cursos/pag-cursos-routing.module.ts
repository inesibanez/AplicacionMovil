import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagCursosPage } from './pag-cursos.page';

const routes: Routes = [
  {
    path: '',
    component: PagCursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagCursosPageRoutingModule {}
