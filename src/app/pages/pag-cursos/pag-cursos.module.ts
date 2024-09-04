import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagCursosPageRoutingModule } from './pag-cursos-routing.module';

import { PagCursosPage } from './pag-cursos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagCursosPageRoutingModule
  ],
  declarations: [PagCursosPage]
})
export class PagCursosPageModule {}
