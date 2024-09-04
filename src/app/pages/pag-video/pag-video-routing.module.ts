import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagVideoPage } from './pag-video.page';

const routes: Routes = [
  {
    path: '',
    component: PagVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagVideoPageRoutingModule {}
