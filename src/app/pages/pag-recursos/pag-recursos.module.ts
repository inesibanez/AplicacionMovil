import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagRecursosPageRoutingModule } from './pag-recursos-routing.module';

import { PagRecursosPage } from './pag-recursos.page';
import { SettingsComponentModule } from 'src/app/components/settings/settings.module';

@NgModule({
  imports: [
    SettingsComponentModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PagRecursosPageRoutingModule
  ],
  declarations: [PagRecursosPage]
})
export class PagRecursosPageModule {}
