import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recurso } from 'src/app/interfaces/recurso';
import { StorageService } from 'src/app/services/storage.service';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { OperacionesService } from 'src/app/services/operaciones.service';

@Component({
  selector: 'app-pag-actividad',
  templateUrl: './pag-actividad.page.html',
  styleUrls: ['./pag-actividad.page.scss']
})
/**
 * Componente para la página de actividad en la aplicación.
 * Permite a los usuarios interactuar con un recurso específico, marcándolo como favorito o realizado, y acceder a recursos adaptados.
 */
export class PagActividadPage implements OnInit {

  idClase: string;
  idBloque: string;
  idRecurso: string;
  estadoRec: string;
  recurso: Recurso;
  textoInstrucciones: string;
  referencia: string;
  urlDelRecurso: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public modalController: ModalController,
              private routerOutlet: IonRouterOutlet,
              private operaciones: OperacionesService,
              private storage: StorageService) { 
    this.recurso = {} as Recurso;
    this.textoInstrucciones = "";
    this.referencia = "";
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Carga los detalles del recurso seleccionado y establece su estado (visto, favorito, realizado, etc.).
   */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.idClase = params['claseId']);
    this.route.params.subscribe((params: Params) => this.idBloque = params['bloqueId']);
    this.route.params.subscribe((params: Params) => this.idRecurso = params['recursoId']);
    this.route.params.subscribe((params: Params) => this.estadoRec = params['valor']);
    this.operaciones.devuelveRecurso(this.idRecurso).then((value) => {
      this.recurso = value as Recurso;
      if (this.estadoRec == "visto") {
        this.recurso.visto = true;
        this.recurso.favorito = false;
        this.recurso.realizado = false;
      }
      if (this.estadoRec == "fav") {
        this.recurso.favorito = true;
        this.recurso.realizado = false;
        this.recurso.visto = true;
      }
      if (this.estadoRec == "done") {
        this.recurso.favorito = false;
        this.recurso.realizado = true;
        this.recurso.visto = true;
      }
      if (this.estadoRec == "favdone") {
        this.recurso.favorito = true;
        this.recurso.realizado = true;
        this.recurso.visto = true;
      }
      if (this.estadoRec == "null") {
        this.estadoRec = "visto";
        this.recurso.visto = false;
        this.recurso.favorito = false;
        this.recurso.realizado = false;
      }
      this.textoInstrucciones = this.recurso.instrucciones;
      this.referencia = this.recurso.idBusqueda;
      this.urlDelRecurso = this.recurso.enlace;
      if (!this.recurso.visto) {
        this.presentModal();
      }
    }).catch((error) => {
      this.textoInstrucciones = "Error de conexión con la base de datos. Inténtelo más tarde";
      this.referencia = "XXX";
      this.presentModal();
      console.log(error);
    });
  }

  /**
   * Navega a la página de video asociada al recurso actual.
   */
  irVideo() {
    this.router.navigate(['/pag-video', { claseId: this.idClase, bloqueId: this.idBloque, recursoId: this.idRecurso, valor: this.estadoRec }]);
  }

  /**
   * Navega de regreso a la página de recursos. Marca el recurso como visto si es necesario.
   */
  volver() {
    if (this.estadoRec == "visto") {
      this.storage.marcarVisto(this.idRecurso).then(() => {
        this.router.navigate(['/pag-recursos', { claseId: this.idClase, bloqueId: this.idBloque }]);
      });
    } else {
      this.router.navigate(['/pag-recursos', { claseId: this.idClase, bloqueId: this.idBloque }]);
    }
  }

  /**
   * Cambia el estado de favorito del recurso. Actualiza el almacenamiento local y el estado del recurso.
   * @param {string} id - El identificador del recurso.
   */
  cambioFavorito(id: string) {
    if (!this.recurso.favorito) {
      this.recurso.favorito = true;
      this.storage.marcarFavorito(id).then(() => {
        this.estadoRec = this.estadoRec == "done" ? "favdone" : "fav";
      });
    } else {
      this.recurso.favorito = false;
      this.storage.desmarcarFavorito(id).then(() => {
        this.estadoRec = this.estadoRec == "favdone" ? "done" : "visto";
      });
    }
  }

  /**
   * Cambia el estado de realizado del recurso. Actualiza el almacenamiento local y el estado del recurso.
   * @param {string} id - El identificador del recurso.
   */
  cambioRealizado(id: string) {
    if (!this.recurso.realizado) {
      this.recurso.realizado = true;
      this.storage.marcarRealizado(id).then(() => {
        this.estadoRec = this.estadoRec == "fav" ? "favdone" : "done";
      });
    } else {
      this.recurso.realizado = false;
      this.storage.desmarcarRealizado(id).then(() => {
        this.estadoRec = this.estadoRec == "favdone" ? "fav" : "visto";
      });
    }
  }

  /**
   * Navega a la página de actividad del recurso adaptado.
   * @param {string} id - El identificador del recurso adaptado.
   */
  irRecursoAdaptado(id: string) {
    this.storage.devuelveInfo(id).then((valor: string) => {
      this.router.navigate(['/pag-actividad', { claseId: this.idClase, bloqueId: this.idBloque, recursoId: id, valor: valor }]);
    });
  }

  /**
   * Presenta un modal con las instrucciones y la referencia de un recurso.
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
