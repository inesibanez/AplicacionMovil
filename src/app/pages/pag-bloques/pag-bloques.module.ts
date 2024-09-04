import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagBloquesPageRoutingModule } from './pag-bloques-routing.module';

import { PagBloquesPage } from './pag-bloques.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagBloquesPageRoutingModule
  ],
  declarations: [PagBloquesPage]
})
export class PagBloquesPageModule {}
