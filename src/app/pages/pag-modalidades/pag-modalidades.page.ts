import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OperacionesService } from 'src/app/services/operaciones.service';
import { OperacionesMockService } from 'src/app/services/operaciones-mock.service';
import { Modalidad } from 'src/app/interfaces/modalidad';
import { Curso } from 'src/app/interfaces/curso';
import { Clase } from 'src/app/interfaces/clase';
import { Recurso } from 'src/app/interfaces/recurso';

@Component({
  selector: 'app-pag-modalidades',
  templateUrl: './pag-modalidades.page.html',
  styleUrls: ['./pag-modalidades.page.scss'],
})
/**
 * Componente para la página de selección de modalidades en la aplicación.
 * Permite a los usuarios seleccionar una modalidad dentro de un curso y navegar hacia los bloques asociados.
 */
export class PagModalidadesPage implements OnInit {

  idNivel: string;
  idCurso: string;
  curso: Curso;
  modalidades : Modalidad[];
  buscarRecurso: boolean;
  spinner: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private operaciones: OperacionesService,
              private mock: OperacionesMockService) { 
    this.curso = {} as Curso;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Carga las modalidades disponibles basadas en el nivel educativo y curso seleccionados, y gestiona el estado de la interfaz.
   */
  ngOnInit() {
    this.spinner = true;
    this.route.params.subscribe((params: Params) => this.idNivel = params['nivelId']);
    this.route.params.subscribe((params: Params) => this.idCurso = params['cursoId']);
    this.operaciones.devuelveCurso(this.idCurso).then((value) => {
      this.curso = value as Curso;
    }).catch((error) => {
      // TODO: Agregar notificación de problemas de conexión.
      this.curso = this.mock.devuelveCurso(this.idCurso);
      console.log(error);
    });
    this.operaciones.devuelveModalidadesPorNivelEducativoYCurso(this.idNivel, this.idCurso).then((value) => {
      this.modalidades = value as Modalidad[];
    }).catch((error) => {
      // TODO: Agregar notificación de problemas de conexión.
      this.modalidades = this.mock.devuelveModalidadesPorNivelEducativoYCurso(this.idNivel, this.idCurso);
      console.log(error);
    }).finally(() => {
      this.spinner = false;
    });
    this.buscarRecurso = false;
  }

  /**
   * Navega a la página de bloques basada en la modalidad seleccionada.
   * @param {string} id - El identificador de la modalidad seleccionada.
   */
  seleccionModalidad(id: string) {
    this.operaciones.devuelveClasePorNivelEducativoCursoYModalidad(this.idNivel, this.idCurso, id).then((value) => {
      let clases = value as Clase[];
      this.router.navigate(['/pag-bloques', { claseId: clases[0].id }]);
    }).catch((error) => {
      // TODO: Agregar notificación de problemas de conexión.
      let clase = this.mock.devuelveClasePorNivelEducativoCursoYModalidad(this.idNivel, this.idCurso, id);
      this.router.navigate(['/pag-bloques', { claseId: clase.id }]);
      console.log(error);
    });
  }

  /**
   * Navega de regreso a la página de selección de cursos.
   */
  volver() {
    this.router.navigate(['/pag-cursos', { nivelId: this.idNivel }]);
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
