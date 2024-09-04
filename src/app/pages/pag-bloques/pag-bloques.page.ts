import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Bloque } from 'src/app/interfaces/bloque';
import { Clase } from 'src/app/interfaces/clase';
import { Modalidad } from 'src/app/interfaces/modalidad';
import { OperacionesService } from 'src/app/services/operaciones.service';
import { OperacionesMockService } from 'src/app/services/operaciones-mock.service';
import { Recurso } from 'src/app/interfaces/recurso';

@Component({
  selector: 'app-pag-bloques',
  templateUrl: './pag-bloques.page.html',
  styleUrls: ['./pag-bloques.page.scss'],
})
/**
 * Componente para la página de selección de bloques en la aplicación.
 * Permite a los usuarios seleccionar un bloque dentro de una clase y navegar hacia los recursos asociados.
 */
export class PagBloquesPage implements OnInit {

  idClase: string;
  clase: Clase;
  bloques: Bloque[];
  buscarRecurso: boolean;
  spinner: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private operaciones: OperacionesService,
              private mock: OperacionesMockService) { 
    this.clase = {} as Clase;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Carga los bloques disponibles basados en la clase seleccionada y gestiona el estado de la interfaz.
   */
  ngOnInit() {
    this.spinner = true;
    this.route.params.subscribe((params: Params) => this.idClase = params['claseId']);
    this.operaciones.devuelveClase(this.idClase).then((value) => {
      this.clase = value as Clase;
    }).catch((error) => {
      // TODO: Agregar notificación de problemas de conexión.
      this.clase = this.mock.devuelveClase(this.idClase);
      console.log(error);
    });
    this.operaciones.devuelveBloques().then((value) => {
      this.bloques = value as Bloque[];
    }).catch((error) => {
      // TODO: Agregar notificación de problemas de conexión.
      this.bloques = this.mock.devuelveBloques();
      console.log(error);
    }).finally(() => {
      this.spinner = false;
    });
    this.buscarRecurso = false;
  }

  /**
   * Navega a la página de recursos basada en el bloque seleccionado.
   * @param {string} id - El identificador del bloque seleccionado.
   */
  seleccionBloque(id: string) {
    this.router.navigate(['/pag-recursos', { claseId: this.idClase, bloqueId: id }]);
  }

  /**
   * Navega de regreso a la página de selección de modalidades o cursos, según el contexto.
   */
  volver() {
    this.operaciones.devuelveModalidadesPorNivelEducativoYCurso(this.clase.nivelEducativo.id, this.clase.curso.id).then((value) => {
      let modalidades = value as Modalidad[];
      if(modalidades.length > 1) {
        this.router.navigate(['/pag-modalidades', { nivelId: this.clase.nivelEducativo.id, cursoId: this.clase.curso.id }]);
      } else {
        this.router.navigate(['/pag-cursos', { nivelId: this.clase.nivelEducativo.id }]);
      }
    }).catch((error) => {
      // TODO: Agregar notificación de problemas de conexión.
      let modalidades = this.mock.devuelveModalidadesPorNivelEducativoYCurso(this.clase.nivelEducativo.id, this.clase.curso.id);
      if(modalidades.length > 1) {
        this.router.navigate(['/pag-modalidades', { nivelId: this.clase.nivelEducativo.id, cursoId: this.clase.curso.id }]);
      } else {
        this.router.navigate(['/pag-cursos', { nivelId: this.clase.nivelEducativo.id }]);
      }
      console.log(error);
    });
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
      if(recurso != null) {
        this.buscarRecurso = false;
        this.router.navigate(['/pag-recursos', { busquedaId: claveBusqueda }]);
      }  
    });
  }

}
