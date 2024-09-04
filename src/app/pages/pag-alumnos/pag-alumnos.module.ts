import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagAlumnosPageRoutingModule } from './pag-alumnos-routing.module';

import { PagAlumnosPage } from './pag-alumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagAlumnosPageRoutingModule
  ],
  declarations: [PagAlumnosPage]
})
export class PagAlumnosPageModule {}
