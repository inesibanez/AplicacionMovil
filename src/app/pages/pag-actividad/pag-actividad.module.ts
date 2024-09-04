import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagActividadPageRoutingModule } from './pag-actividad-routing.module';

import { PagActividadPage } from './pag-actividad.page';
import { SettingsComponentModule } from 'src/app/components/settings/settings.module';

@NgModule({
  imports: [
    SettingsComponentModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PagActividadPageRoutingModule
  ],
  declarations: [PagActividadPage]
})
export class PagActividadPageModule {}
