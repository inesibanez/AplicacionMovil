import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

  constructor(private navCtrl: NavController, private modalCtrl: ModalController) {

  }
  
  texto: string = "Default text";
  
  referencia: string = "###";

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

}
