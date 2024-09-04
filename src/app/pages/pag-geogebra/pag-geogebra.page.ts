import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pag-geogebra',
  templateUrl: './pag-geogebra.page.html',
  styleUrls: ['./pag-geogebra.page.scss'],
})
/**
 * Componente para la página de GeoGebra de la aplicación.
 * Muestra videos de introducción al proyecto y a GeoGebra, y permite la navegación hacia otras partes de la aplicación.
 */
export class PagGeogebraPage implements OnInit {

  urlVideoProyecto: string;
  urlVideoGeoGebra: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { 
    this.urlVideoProyecto = "https://www.youtube.com/embed/dmRhaeDjjAg";
    this.urlVideoGeoGebra = "https://www.youtube.com/embed/fEVb9rzEcBk";
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit() {
  }

  /**
   * Genera una URL segura para incrustar videos, permitiendo visualizar contenido externo de manera segura.
   * @param {number} numero - Identificador del video a mostrar (0 para el proyecto, 2 para GeoGebra).
   * @returns {any} URL segura para incrustar el video.
   */
  urlExterior(numero: number) {
    switch(numero){
      case 0:
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlVideoProyecto);
      case 2:
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlVideoGeoGebra);
      default:
        this.router.navigate(['/pag-inicio']);
    }
  }

  /**
   * Navega a la página de alumnos para iniciar la aplicación.
   */
  empezar() {
    this.router.navigate(['/pag-alumnos']);
  }

}
