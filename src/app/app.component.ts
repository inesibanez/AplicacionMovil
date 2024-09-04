import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  routerHidden = true;
  @ViewChild('splash', {static: false})splash: ElementRef;
  constructor(private storage: Storage,
    private platform: Platform) {
      this.initializeApp();
    }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.routerHidden = false;
        this.splash.nativeElement.style.display = 'none';
      }, 3000)
    });
  }

}
