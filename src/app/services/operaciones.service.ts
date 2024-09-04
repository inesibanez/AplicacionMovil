import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

  dirLocal: string;
  dirGeoProxy: string;

  constructor(private http: HttpClient) { 
    this.dirLocal = '/local';
    this.dirGeoProxy = '/geogebra';
  }

  /**
   * Devuelve una lista de niveles educativos disponibles.
   * @returns {Promise<any>} Promesa que resuelve con la lista de niveles educativos.
   */
  devuelveNivelesEducativos() {
    const niveles = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/Filtros/nivelesEducativos').toPromise());
    });
    return niveles;
  }

  /**
   * Devuelve el nivel educativo específico por su ID.
   * @param {string} id - El identificador del nivel educativo.
   * @returns {Promise<any>} Promesa que resuelve con el nivel educativo solicitado.
   */
  devuelveNivelEducativo(id: string) {
    const nivel = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/Filtros/nivelEducativo/' + id).toPromise());
    });
    return nivel;
  }

  /**
   * Devuelve una lista de cursos disponibles.
   * @returns {Promise<any>} Promesa que resuelve con la lista de cursos.
   */
  devuelveCursos() {
    const cursos = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/Filtros/cursos').toPromise());
    });
    return cursos;
  }

  /**
   * Devuelve un curso específico por su ID.
   * @param {string} id - El identificador del curso.
   * @returns {Promise<any>} Promesa que resuelve con el curso solicitado.
   */
  devuelveCurso(id: string) {
    const curso = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/Filtros/curso/' + id).toPromise());
    });
    return curso;
  }

  /**
   * Devuelve una lista de cursos asociados a un nivel educativo específico.
   * @param {string} id - El identificador del nivel educativo.
   * @returns {Promise<any>} Promesa que resuelve con la lista de cursos para el nivel educativo solicitado.
   */
  devuelveCursosPorNivelEducativo(id: string) {
    const cursos = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/Filtros/cursosNivelEducativo/' + id).toPromise());
    });
    return cursos;
  }

  /**
   * Devuelve una lista de modalidades disponibles.
   * @returns {Promise<any>} Promesa que resuelve con la lista de modalidades.
   */
  devuelveModalidades() {
    const modalidades = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/Filtros/modalidades').toPromise());
    });
    return modalidades;
  }

  /**
   * Devuelve una modalidad específica por su ID.
   * @param {string} id - El identificador de la modalidad.
   * @returns {Promise<any>} Promesa que resuelve con la modalidad solicitada.
   */
  devuelveModalidad(id: string) {
    const modalidad = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/Filtros/modalidad/' + id).toPromise());
    });
    return modalidad;
  }

  /**
   * Devuelve una lista de modalidades asociadas a un nivel educativo y curso específico.
   * @param {string} idNivelEducativo - El identificador del nivel educativo.
   * @param {string} idCurso - El identificador del curso.
   * @returns {Promise<any>} Promesa que resuelve con la lista de modalidades para el nivel educativo y curso solicitados.
   */
  devuelveModalidadesPorNivelEducativoYCurso(idNivelEducativo: string, idCurso: string) {
    const modalidades = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/Filtros/modalidadNivelEducativoCurso/' + idNivelEducativo + '/' + idCurso).toPromise());
    });
    return modalidades;
  }

  /**
   * Devuelve una clase específica por su ID.
   * @param {string} id - El identificador de la clase.
   * @returns {Promise<any>} Promesa que resuelve con la clase solicitada.
   */
  devuelveClase(id: string) {
    const clase = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/Filtros/clase/' + id).toPromise());
    });
    return clase;
  }

  /**
   * Devuelve una lista de clases asociadas a un nivel educativo, curso y modalidad específicos.
   * @param {string} idNivelEducativo - El identificador del nivel educativo.
   * @param {string} idCurso - El identificador del curso.
   * @param {string} idModalidad - El identificador de la modalidad.
   * @returns {Promise<any>} Promesa que resuelve con la lista de clases para el nivel educativo, curso y modalidad solicitados.
   */
  devuelveClasePorNivelEducativoCursoYModalidad(idNivelEducativo: string, idCurso: string, idModalidad: string) {
    const clase = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/Filtros/claseNivelEducativoCursoModalidad/' + idNivelEducativo + '/' + idCurso + '/' + idModalidad).toPromise());
    });
    return clase;
  }

  /**
   * Devuelve una lista de bloques disponibles.
   * @returns {Promise<any>} Promesa que resuelve con la lista de bloques.
   */
  devuelveBloques() {
    const bloques = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/Filtros/bloques').toPromise());
    });
    return bloques;
  }

  /**
   * Devuelve un bloque específico por su ID.
   * @param {string} id - El identificador del bloque.
   * @returns {Promise<any>} Promesa que resuelve con el bloque solicitado.
   */
  devuelveBloque(id: string) {
    const bloque = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/Filtros/bloque/' + id).toPromise());
    });
    return bloque;
  }

  /**
   * Devuelve un recurso específico por su ID.
   * @param {string} id - El identificador del recurso.
   * @returns {Promise<any>} Promesa que resuelve con el recurso solicitado.
   */
  devuelveRecurso(id: string) {
    const recurso = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/recursos/recurso/' + id).toPromise());
    });
    return recurso;
  }

  /**
   * Realiza una búsqueda de un recurso por su ID de búsqueda.
   * @param {string} idBusqueda - El identificador de búsqueda del recurso.
   * @returns {Promise<any>} Promesa que resuelve con el recurso encontrado o `null` si el ID es inválido.
   */
  busquedaDeRecurso(idBusqueda: string) {
    if (idBusqueda.length > 5) {
      return null;
    }
    const recurso = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/Filtros/recurso/' + idBusqueda).toPromise());
    });
    return recurso;
  }

  /**
   * Devuelve una lista de recursos agrupados en bloques y ordenados, puede haber recursos repetidos.
   * @param {string} idClase - El identificador de la clase.
   * @param {string} idBloque - El identificador del bloque.
   * @returns {Promise<any>} Promesa que resuelve con la lista de recursos.
   */
  devuelveRecursosPorClaseOrdenadosPorBloque(idClase: string, idBloque: string) {
    const recurso = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/recursos/recursosClaseOrdenados/' + idClase + '/' + idBloque).toPromise());
    });
    return recurso;
  }

  /**
   * Devuelve una lista de recursos específicos de una clase y bloque.
   * @param {string} idClase - El identificador de la clase.
   * @param {string} idBloque - El identificador del bloque.
   * @returns {Promise<any>} Promesa que resuelve con la lista de recursos.
   */
  devuelveRecursosPorClaseYBloque(idClase: string, idBloque: string) {
    const recurso = new Promise<any>((resolve) => {
      resolve(this.http.get(this.dirGeoProxy + '/recursos/recursosClaseBloque/' + idClase + '/' + idBloque).toPromise());
    });
    return recurso;
  }

}
