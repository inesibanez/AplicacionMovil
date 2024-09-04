import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-spinner-modal',
  templateUrl: './spinner-modal.component.html',
  styleUrls: ['./spinner-modal.component.scss'],
})
export class SpinnerModalComponent {

  constructor(private navCtrl: NavController, private modalCtrl: ModalController) { }

}
