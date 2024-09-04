import { NivelEducativo } from "./nivel-educativo";
import { Curso } from "./curso";
import { Modalidad } from "./modalidad";

/**
 * Interface que representa una Clase en el sistema.
 * Una clase es una agrupación educativa que combina nivel, curso y modalidad.
 */
export interface Clase {
	
	/**
     * Identificador único de la clase.
     */
    id: string;

    /**
     * Nivel educativo al que pertenece la clase (e.g., primaria, secundaria).
     */
    nivelEducativo: NivelEducativo;

    /**
     * Curso específico dentro del nivel educativo (e.g., 1º, 2º).
     */
    curso: Curso;

    /**
     * Modalidad de la clase (e.g., ciencias, matemática aplicadas).
     */
    modalidad: Modalidad;

    /**
     * Nombre descriptivo de la clase.
     */
    nombre: string;
}
