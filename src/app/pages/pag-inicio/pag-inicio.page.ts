import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pag-inicio',
  templateUrl: './pag-inicio.page.html',
  styleUrls: ['./pag-inicio.page.scss'],
})
/**
 * Componente para la página de inicio de la aplicación.
 * Proporciona navegación hacia otras secciones de la aplicación, como la página de alumnos y la página de GeoGebra.
 */
export class PagInicioPage implements OnInit {

  constructor(private router: Router) { }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit() {
  }

  /**
   * Navega a la página de alumnos.
   */
  navigate(){
    this.router.navigate(['/pag-alumnos']);
  }

  /**
   * Navega a la página de GeoGebra.
   */
  navigate_info(){
    this.router.navigate(['/pag-geogebra']);
  }

}
