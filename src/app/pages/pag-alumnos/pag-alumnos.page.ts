import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NivelEducativo } from '../../interfaces/nivel-educativo';
import { OperacionesMockService } from 'src/app/services/operaciones-mock.service';
import { OperacionesService } from 'src/app/services/operaciones.service';
import { Recurso } from 'src/app/interfaces/recurso';

@Component({
  selector: 'app-pag-alumnos',
  templateUrl: './pag-alumnos.page.html',
  styleUrls: ['./pag-alumnos.page.scss'],
})
/**
 * Componente para la página de selección de alumnos en la aplicación.
 * Permite a los usuarios seleccionar un nivel educativo, realizar búsquedas de recursos y navegar a otras partes de la aplicación.
 */
export class PagAlumnosPage implements OnInit {

  nivelesEducativos: NivelEducativo[];
  buscarRecurso: boolean;
  spinner: boolean;

  constructor(private router: Router,
              private operaciones: OperacionesService,
              private mock: OperacionesMockService) { }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Carga los niveles educativos disponibles y gestiona el estado de la interfaz.
   */
  ngOnInit() {
    this.spinner = true;
    this.operaciones.devuelveNivelesEducativos().then((value) => {
      this.nivelesEducativos = value as NivelEducativo[];
    }).catch((error) => {
      // TODO: Agregar notificación de problemas de conexión.
      this.nivelesEducativos = [
        { id: "I", nombre: "INFANTIL (No Connection)" },
        { id: "P", nombre: "PRIMARIA (No Connection)" },
        { id: "E", nombre: "E.S.O. (No Connection)" },
        { id: "B", nombre: "BACHILLERATO (No Connection)" }
      ];
      console.log(error);
    }).finally(() => {
      this.spinner = false;
    });    
    this.buscarRecurso = false;
  }

  /**
   * Navega a la página de cursos basándose en el nivel educativo seleccionado.
   * @param {string} id - El identificador del nivel educativo seleccionado.
   */
  seleccionNivelEducativo(id: string) {
    this.router.navigate(['/pag-cursos', { nivelId: id }]);
  }

  /**
   * Navega de regreso a la página principal.
   */
  volver() {
    this.router.navigate(['/']);
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
