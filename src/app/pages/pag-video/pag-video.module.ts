import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagVideoPageRoutingModule } from './pag-video-routing.module';

import { PagVideoPage } from './pag-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagVideoPageRoutingModule
  ],
  declarations: [PagVideoPage]
})
export class PagVideoPageModule {}
