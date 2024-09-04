import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagAlumnosPage } from './pag-alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: PagAlumnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagAlumnosPageRoutingModule {}
