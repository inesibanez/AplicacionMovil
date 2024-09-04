import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SettingsComponent } from './settings.component';

import { SafePipe } from 'src/app/components/pipe/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [SettingsComponent, SafePipe],
  entryComponents: [SettingsComponent],
  exports: [SettingsComponent, SafePipe]
})
export class SettingsComponentModule {}
