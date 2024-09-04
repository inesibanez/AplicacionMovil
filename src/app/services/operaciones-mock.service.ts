import { Injectable } from '@angular/core';
import { Curso } from "src/app/interfaces/curso";
import { Modalidad } from "src/app/interfaces/modalidad";
import { Recurso } from "src/app/interfaces/recurso";
import { MockBloque } from "src/assets/mocks/mock-bloque";
import { MockClase } from "src/assets/mocks/mock-clase";
import { MockCurso } from "src/assets/mocks/mock-curso";
import { MockModalidad } from "src/assets/mocks/mock-modalidad";
import { MockNivelEducativo } from "src/assets/mocks/mock-nivel-educativo";
import { MockRecurso } from "src/assets/mocks/mock-recurso";
import { Clase } from '../interfaces/clase';
import { Injectable } from '@angular/core';

/**
 * Servicio que proporciona datos simulados (mock) para pruebas y desarrollo sin conexión al backend real.
 * Este servicio actúa como un reemplazo del servicio real de operaciones para proporcionar datos estáticos.
 */
@Injectable({
  providedIn: 'root'
})
export class OperacionesMockService {

  bloques: MockBloque;
  clases: MockClase;
  cursos: MockCurso;
  modalidades: MockModalidad;
  niveles: MockNivelEducativo;
  recursos: MockRecurso;

  constructor() {
    this.bloques = new MockBloque();
    this.clases = new MockClase();
    this.cursos = new MockCurso();
    this.modalidades = new MockModalidad();
    this.niveles = new MockNivelEducativo();
    this.recursos = new MockRecurso();
  }

  /**
   * Devuelve una lista simulada de niveles educativos.
   * @returns {any[]} Lista de niveles educativos simulados.
   */
  devuelveNivelesEducativos() {
    return this.niveles.lista;
  }

  /**
   * Devuelve un nivel educativo simulado específico por su ID.
   * @param {string} id - El identificador del nivel educativo.
   * @returns {any} El nivel educativo simulado correspondiente al ID.
   */
  devuelveNivelEducativo(id: string) {
    for(let nivel of this.niveles.lista) {
      if(nivel.id == id) {
        return nivel;
      }
    }
  }

  /**
   * Devuelve una lista simulada de cursos.
   * @returns {any[]} Lista de cursos simulados.
   */
  devuelveCursos() {
    return this.cursos.lista;
  }

  /**
   * Devuelve un curso simulado específico por su ID.
   * @param {string} id - El identificador del curso.
   * @returns {any} El curso simulado correspondiente al ID.
   */
  devuelveCurso(id: string) {
    for(let curso of this.cursos.lista) {
      if(curso.id == id) {
        return curso;
      }
    }
  }

  /**
   * Devuelve una lista simulada de cursos asociados a un nivel educativo específico.
   * @param {string} id - El identificador del nivel educativo.
   * @returns {Curso[]} Lista de cursos simulados para el nivel educativo solicitado.
   */
  devuelveCursosPorNivelEducativo(id: string) {
    var cursos = [] as Curso[];
    for(let clase of this.clases.lista) {
      if(clase.nivelEducativo.id == id) {
        if(cursos.findIndex(c => c.id == clase.curso.id) == -1) {
          cursos.push(clase.curso);
        }
      }
    }
    return cursos;
  }

  /**
   * Devuelve una lista simulada de modalidades.
   * @returns {any[]} Lista de modalidades simuladas.
   */
  devuelveModalidades() {
    return this.modalidades.lista;
  }

  /**
   * Devuelve una modalidad simulada específica por su ID.
   * @param {string} id - El identificador de la modalidad.
   * @returns {any} La modalidad simulada correspondiente al ID.
   */
  devuelveModalidad(id: string) {
    for(let modalidad of this.modalidades.lista) {
      if(modalidad.id == id) {
        return modalidad;
      }
    }
  }

  /**
   * Devuelve una lista simulada de modalidades asociadas a un nivel educativo y curso específicos.
   * @param {string} idNivelEducativo - El identificador del nivel educativo.
   * @param {string} idCurso - El identificador del curso.
   * @returns {Modalidad[]} Lista de modalidades simuladas para el nivel educativo y curso solicitados.
   */
  devuelveModalidadesPorNivelEducativoYCurso(idNivelEducativo: string, idCurso: string) {
    var modalidades = [] as Modalidad[];
    for(let clase of this.clases.lista) {
      if(clase.nivelEducativo.id == idNivelEducativo && clase.curso.id == idCurso) {
        modalidades.push(clase.modalidad);
      }
    }
    return modalidades;
  }

  /**
   * Devuelve una clase simulada específica por su ID.
   * @param {string} id - El identificador de la clase.
   * @returns {Clase} La clase simulada correspondiente al ID.
   */
  devuelveClase(id: string) {
    for(let clase of this.clases.lista) {
      if(clase.id == id) {
        return clase;
      }
    }
  }
  
  /**
   * Devuelve una clase simulada específica por nivel educativo, curso y modalidad.
   * @param {string} idNivelEducativo - El identificador del nivel educativo.
   * @param {string} idCurso - El identificador del curso.
   * @param {string} idModalidad - El identificador de la modalidad.
   * @returns {Clase | null} La clase simulada correspondiente a los parámetros o `null` si no se encuentra.
   */
  devuelveClasePorNivelEducativoCursoYModalidad(idNivelEducativo: string, idCurso: string, idModalidad: string) {
    for(let clase of this.clases.lista) {
      if(clase.nivelEducativo.id == idNivelEducativo && clase.curso.id == idCurso && clase.modalidad.id == idModalidad) {
        return clase;
      }
    }
    return null;
  }

  /**
   * Devuelve una lista simulada de bloques.
   * @returns {any[]} Lista de bloques simulados.
   */
  devuelveBloques() {
    return this.bloques.lista;
  }

  /**
   * Devuelve un bloque simulado específico por su ID.
   * @param {string} id - El identificador del bloque.
   * @returns {any} El bloque simulado correspondiente al ID.
   */
  devuelveBloque(id: string) {
    for(let bloque of this.bloques.lista) {
      if(bloque.id == id) {
        return bloque;
      }
    }
  }
}
