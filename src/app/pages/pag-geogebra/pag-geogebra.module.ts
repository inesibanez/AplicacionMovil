import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagGeogebraPageRoutingModule } from './pag-geogebra-routing.module';

import { PagGeogebraPage } from './pag-geogebra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagGeogebraPageRoutingModule
  ],
  declarations: [PagGeogebraPage]
})
export class PagGeogebraPageModule {}
