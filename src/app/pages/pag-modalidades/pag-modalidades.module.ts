import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagModalidadesPageRoutingModule } from './pag-modalidades-routing.module';

import { PagModalidadesPage } from './pag-modalidades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagModalidadesPageRoutingModule
  ],
  declarations: [PagModalidadesPage]
})
export class PagModalidadesPageModule {}
