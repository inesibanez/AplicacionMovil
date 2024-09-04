import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Bloque } from 'src/app/interfaces/bloque';
import { Clase } from 'src/app/interfaces/clase';
import { Recurso } from 'src/app/interfaces/recurso';
import { Cuatro } from 'src/app/interfaces/cuatro';
import { OperacionesMockService } from 'src/app/services/operaciones-mock.service';
import { StorageService } from 'src/app/services/storage.service';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { OperacionesService } from 'src/app/services/operaciones.service';

@Component({
  selector: 'app-pag-recursos',
  templateUrl: './pag-recursos.page.html',
  styleUrls: ['./pag-recursos.page.scss'],
})
/**
 * Componente para la página de recursos en la aplicación.
 * Permite a los usuarios ver y seleccionar recursos dentro de un bloque, gestionar favoritos, y acceder a configuraciones adicionales.
 */
export class PagRecursosPage implements OnInit {

  idClase: string;
  idBloque: string;
  idBusqueda: string;
  clase: Clase;
  bloque: Bloque;
  recursos: Recurso[];
  listaFavoritos: string[];
  listaRealizados: string[];
  listaVistos: string[];
  listaCuatro: Cuatro[];
  cuatroResto: Cuatro;
  resto: number;
  textoInstrucciones: string;
  referencia: string;
  buscarRecurso: boolean;
  spinner: boolean;
  LONGITUD_TOPE = 220;
  LONGITUD_TOPE_TITULO = 24;
  LONGITUD_TOPE_2 = 165;
  promises = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              public modalController: ModalController,
              private routerOutlet: IonRouterOutlet,
              private sanitizer: DomSanitizer,
              private operaciones: OperacionesService,
              private mock: OperacionesMockService,
              private storage: StorageService) { 
    this.clase = {} as Clase;
    this.bloque = {} as Bloque;
    this.listaFavoritos = null;
    this.listaRealizados = null;
    this.listaVistos = null;
    this.cuatroResto = {
      recurso0: {} as Recurso,
      recurso1: {} as Recurso,
      recurso2: {} as Recurso,
      recurso3: {} as Recurso
    } as Cuatro;
    this.textoInstrucciones = "";
    this.referencia = "";
    this.buscarRecurso = false;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Carga los recursos disponibles según la clase y bloque seleccionados, o realiza una búsqueda específica si se proporciona un ID de búsqueda.
   */
  ngOnInit() {
    this.spinner = true;
    this.route.params.subscribe((params: Params) => this.idClase = params['claseId']);
    this.route.params.subscribe((params: Params) => this.idBloque = params['bloqueId']);
    this.route.params.subscribe((params: Params) => this.idBusqueda = params['busquedaId']);
    
    if(this.idBusqueda === undefined) {
      this.operaciones.devuelveClase(this.idClase).then((value) => {
        this.clase = value as Clase;
      }).catch((error) => {
        // TODO: Agregar notificación de problemas de conexión.
        this.clase = this.mock.devuelveClase(this.idClase);
        console.log(error);
      });
      this.operaciones.devuelveBloque(this.idBloque).then((value) => {
        this.bloque = value as Bloque;
      }).catch((error) => {
        // TODO: Agregar notificación de problemas de conexión.
        this.bloque = this.mock.devuelveBloque(this.idBloque);
        console.log(error);
      });

      this.promises.push(new Promise(async (resolve) => {
        var value = await this.operaciones.devuelveRecursosPorClaseYBloque(this.idClase, this.idBloque);
        resolve(value);
      }));
      
    } else {
      this.operaciones.busquedaDeRecurso(this.idBusqueda.toLocaleUpperCase()).then((value) => {
        let recurso = value as Recurso;
        this.storage.devuelveInfo(recurso.id).then((valor: string) => {
          if(valor != null) {
            recurso.visto = true;
            switch(valor) {
              case "fav":
                recurso.realizado = false;
                recurso.favorito = true;
                break;
              case "done":
                recurso.realizado = true;
                recurso.favorito = false;
                break;
              case "favdone":
                recurso.realizado = true;
                recurso.favorito = true;
                break;
            }
          } else {
            recurso.visto = false;
            recurso.realizado = false;
            recurso.favorito = false;
          }
          this.recursos = [] as Recurso[];
          this.idClase = recurso.idClase;
          this.idBloque = recurso.idBloque;
          this.recursos.push(recurso);
          this.agrupaCuatro();
        });
      }).catch((error) => {
        this.textoInstrucciones="Error de conexión con la base de datos. Inténtelo más tarde";
        this.referencia="XXX";
        this.presentModal();
        console.log(error);
      }).finally(() => {
        this.spinner = false;
      });
    }
    
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta antes de que el componente entre en la vista.
   * Carga las listas de recursos vistos, favoritos y realizados desde el almacenamiento local.
   */
  ionViewWillEnter() {
    this.promises.push(new Promise(async (resolve) => {
      this.storage.devuelveVistos().then((resultado: string[]) => {
        this.listaVistos = resultado;
        resolve(null);
      });
      
    }));

    this.promises.push(new Promise(async (resolve) => {
      this.storage.devuelveFavoritos().then((resultado: string[]) => {
        this.listaFavoritos = resultado;
        resolve(null);
      });
    }));

    this.promises.push(new Promise(async (resolve) => {
      this.storage.devuelveHechos().then((resultado: string[]) => {
        this.listaRealizados = resultado;
        resolve(null);
      });
    }));

    Promise.all(this.promises).then((results) => {
      this.recursos = results[0] as Recurso[];
      
      for(let rec of this.recursos) {
        rec.idClase = this.idClase;
        rec.idBloque = this.idBloque;
        rec.visto = this.listaVistos.findIndex(r => r == rec.id) != -1;
        rec.favorito = this.listaFavoritos.findIndex(r => r == rec.id) != -1;
        rec.realizado = this.listaRealizados.findIndex(r => r == rec.id) != -1;
      }
      this.agrupaCuatro();
      
    }).catch((error) => {
      // TODO: Agregar notificación de problemas de conexión.
      console.log(error);
    }).finally(() => {
      this.spinner = false;
    });
  }

  /**
   * Navega a la página de detalles de un recurso seleccionado.
   * @param {string} id - El identificador del recurso seleccionado.
   */
  seleccionRecurso(id: string) {
    this.storage.devuelveInfo(id).then((valor: string) => {
      this.router.navigate(['/pag-actividad', { claseId: this.idClase, bloqueId: this.idBloque, recursoId: id, valor: valor }]);
    });
  }

  /**
   * Navega a la página de video de un recurso seleccionado.
   * @param {string} id - El identificador del recurso seleccionado.
   */
  seleccionVideo(id: string) {
    this.storage.devuelveInfo(id).then((valor: string) => {
      this.router.navigate(['/pag-video', { claseId: this.idClase, bloqueId: this.idBloque, recursoId: id, valor: valor }]);
    });
  }

  /**
   * Devuelve la URL segura para mostrar la imagen del recurso.
   * @param {string} id - El identificador del recurso.
   * @returns {any} La URL segura de la imagen del recurso.
   */
  urlImagen(id: string) {
    for(let recur of this.recursos) {
      if(recur.id == id) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(recur.enlaceImagen);
      }
    }
    return null;
  }

  /**
   * Navega de regreso a la página de bloques o a la página principal dependiendo del contexto.
   */
  volver() {
    if(this.idBusqueda === undefined) {
      this.router.navigate(['/pag-bloques', { claseId: this.clase.id }]);
    } else {
      this.router.navigate(['/pag-alumnos']);
    }
  }

  /**
   * Activa el modo de búsqueda de recursos.
   */
  buscar() {
    this.buscarRecurso = true;
  }

  /**
   * Desactiva el modo de búsqueda de recursos.
   */
  desbuscar() {
    this.buscarRecurso = false;
  }

  /**
     * Realiza una búsqueda de recursos basándose en la clave proporcionada.
     * Si se encuentra un recurso, redirige a la página de recursos correspondiente.
     * @param {string} claveBusqueda - La clave de búsqueda introducida por el usuario.
     */
    accionBusqueda(claveBusqueda: string) {
        this.operaciones.busquedaDeRecurso(claveBusqueda.toLocaleUpperCase()).then((value) => {
            let recurso = value as Recurso;
            if (recurso != null) {
                this.buscarRecurso = false;
                this.router.navigate(['/pag-recursos', { busquedaId: claveBusqueda }]);
            }
        });
    }

    /**
     * Agrupa los recursos en conjuntos de cuatro para su presentación.
     * Los recursos restantes (menos de cuatro) se agrupan en el objeto `cuatroResto`.
     */
    agrupaCuatro() {
        this.resto = this.recursos.length % 4;
        let numCuatros = Math.floor(this.recursos.length / 4);
        this.listaCuatro = [] as Cuatro[];
        for (let i = 0; i < numCuatros; i++) {
            this.listaCuatro.push({
                recurso0: this.recursos[i * 4 + 0],
                recurso1: this.recursos[i * 4 + 1],
                recurso2: this.recursos[i * 4 + 2],
                recurso3: this.recursos[i * 4 + 3]
            } as Cuatro);
        }
        
        switch (this.resto) {
            case 1:
                this.cuatroResto.recurso0 = this.recursos[this.recursos.length - 1];
                break;
            case 2:
                this.cuatroResto.recurso0 = this.recursos[this.recursos.length - 2];
                this.cuatroResto.recurso1 = this.recursos[this.recursos.length - 1];
                break;
            case 3:
                this.cuatroResto.recurso0 = this.recursos[this.recursos.length - 3];
                this.cuatroResto.recurso1 = this.recursos[this.recursos.length - 2];
                this.cuatroResto.recurso2 = this.recursos[this.recursos.length - 1];
                break;
        }
    }

    /**
     * Muestra un modal con las instrucciones de un recurso seleccionado.
     * @param {string} id - El identificador del recurso cuyas instrucciones se desean mostrar.
     */
    mostrarTexto(id: string) {
        for (let recur of this.recursos) {
            if (recur.id == id) {
                this.textoInstrucciones = recur.instrucciones;
                this.referencia = recur.idBusqueda;
                this.presentModal();
            }
        }
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
