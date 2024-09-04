import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Recurso } from 'src/app/interfaces/recurso';
import { OperacionesService } from 'src/app/services/operaciones.service';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pag-video',
  templateUrl: './pag-video.page.html',
  styleUrls: ['./pag-video.page.scss'],
})
/**
 * Componente para la página de visualización de videos en la aplicación.
 * Permite a los usuarios ver el video asociado a un recurso y navegar entre la actividad y la lista de recursos.
 */
export class PagVideoPage implements OnInit {

  idClase: string;
  idBloque: string;
  idRecurso: string;
  estadoRec: string;
  recurso: Recurso;
  textoInstrucciones: string;
  referencia: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public modalController: ModalController,
              private routerOutlet: IonRouterOutlet,
              private sanitizer: DomSanitizer,
              private operaciones: OperacionesService) { 
    this.recurso = {} as Recurso;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Carga los detalles del recurso seleccionado y maneja posibles errores de conexión.
   */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.idClase = params['claseId']);
    this.route.params.subscribe((params: Params) => this.idBloque = params['bloqueId']);
    this.route.params.subscribe((params: Params) => this.idRecurso = params['recursoId']);
    this.route.params.subscribe((params: Params) => this.estadoRec = params['valor']);
    this.operaciones.devuelveRecurso(this.idRecurso).then((value) => {
      this.recurso = value as Recurso;
    }).catch((error) => {
      this.textoInstrucciones = "Error de conexión con la base de datos. Inténtelo más tarde";
      this.referencia = "XXX";
      this.presentModal();
      console.log(error);
    });
  }

  /**
   * Devuelve la URL segura para incrustar el video del recurso en la página.
   * @returns {any} La URL segura del video del recurso.
   */
  urlVideo() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.recurso.enlaceVideo);
  }

  /**
   * Navega a la página de actividad asociada al recurso actual.
   */
  irActividad() {
    this.router.navigate(['/pag-actividad', { claseId: this.idClase, bloqueId: this.idBloque, recursoId: this.idRecurso, valor: this.estadoRec }]);
  }

  /**
   * Navega de regreso a la página de recursos.
   */
  volver() {
    this.router.navigate(['/pag-recursos', { claseId: this.idClase, bloqueId: this.idBloque }]);
  }

  /**
   * Presenta un modal con las instrucciones y la referencia de un recurso en caso de error o cuando se necesite mostrar información adicional.
   * @returns {Promise<void>} Una promesa que se resuelve cuando el modal ha sido presentado.
   */
  async presentModal() {
    const modal = await this.modalController.create({
      component: SettingsComponent,
      componentProps: {
        'texto': this.textoInstrucciones,
        'referencia': this.referencia
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

}
