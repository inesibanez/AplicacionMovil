import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Curso } from 'src/app/interfaces/curso';
import { NivelEducativo } from '../../interfaces/nivel-educativo';
import { OperacionesMockService } from 'src/app/services/operaciones-mock.service';
import { OperacionesService } from 'src/app/services/operaciones.service';
import { Modalidad } from 'src/app/interfaces/modalidad';
import { Clase } from 'src/app/interfaces/clase';
import { Recurso } from 'src/app/interfaces/recurso';

@Component({
  selector: 'app-pag-cursos',
  templateUrl: './pag-cursos.page.html',
  styleUrls: ['./pag-cursos.page.scss'],
})
/**
 * Componente para la página de selección de cursos en la aplicación.
 * Permite a los usuarios seleccionar un curso, realizar búsquedas de recursos y navegar a otras partes de la aplicación.
 */
export class PagCursosPage implements OnInit {
  
  idNivel: string;
  nivelEducativo: NivelEducativo;
  cursos: Curso[];
  buscarRecurso: boolean;
  spinner: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private operaciones: OperacionesService,
              private mock: OperacionesMockService) { 
    this.nivelEducativo = {} as NivelEducativo; 
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Carga los cursos disponibles basados en el nivel educativo seleccionado y gestiona el estado de la interfaz.
   */
  ngOnInit() {
    this.spinner = true;
    this.route.params.subscribe((params: Params) => this.idNivel = params['nivelId']);
    this.operaciones.devuelveNivelEducativo(this.idNivel).then((value) => {
      this.nivelEducativo = value as NivelEducativo;
    }).catch((error) => {
      // TODO: Agregar notificación de problemas de conexión.
      this.nivelEducativo = this.mock.devuelveNivelEducativo(this.idNivel);
      console.log(error);
    });
    this.operaciones.devuelveCursosPorNivelEducativo(this.idNivel).then((value) => {
      this.cursos = value as Curso[];
      if (this.idNivel == "I") {
        for(let cur of this.cursos) {
          switch(cur.id) {
            case "1":
              cur.nombre="3 AÑOS";
              break;
            case "2":
              cur.nombre="4 AÑOS";
              break;
            case "3":
              cur.nombre="5 AÑOS";
              break;
          }
        }
      }
    }).catch((error) => {
      // TODO: Agregar notificación de problemas de conexión.
      this.cursos = this.mock.devuelveCursosPorNivelEducativo(this.idNivel);
      console.log(error);
    }).finally(() => {
      this.spinner = false;
    });
    this.buscarRecurso = false;
  }

  /**
   * Navega a la página de modalidades o bloques según el curso seleccionado.
   * @param {string} id - El identificador del curso seleccionado.
   */
  seleccionCurso(id: string) {
    this.operaciones.devuelveModalidadesPorNivelEducativoYCurso(this.idNivel, id).then((value) => {
      let modalidades = value as Modalidad[];
      if(modalidades.length > 1) {
        this.router.navigate(['/pag-modalidades', { nivelId: this.idNivel, cursoId: id }]);
      } else {
        this.operaciones.devuelveClasePorNivelEducativoCursoYModalidad(this.idNivel, id, modalidades[0].id).then((value) => {
          let clases = value as Clase[];
          this.router.navigate(['/pag-bloques', { claseId: clases[0].id }]);
        });
      }
    }).catch((error) => {
      // TODO: Agregar notificación de problemas de conexión.
      let modalidades = this.mock.devuelveModalidadesPorNivelEducativoYCurso(this.idNivel, id);
      if(modalidades.length > 1) {
        this.router.navigate(['/pag-modalidades', { nivelId: this.idNivel, cursoId: id }]);
      } else {
        let clase = this.mock.devuelveClasePorNivelEducativoCursoYModalidad(this.idNivel, id, modalidades[0].id);
        this.router.navigate(['/pag-bloques', { claseId: clase.id }]);
      }
      console.log(error);
    });
  }

  /**
   * Navega de regreso a la página de selección de alumnos.
   */
  volver() {
    this.router.navigate(['/pag-alumnos']);
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
