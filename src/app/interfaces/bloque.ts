/**
 * Interface que representa un Bloque en el sistema.
 * Un bloque es una agrupación de temario relacionado con la rama de la matemática (e.g., geometría, lógica, medida).
 */
 export interface Bloque {
	 
     /**
     * Identificador único del bloque.
     */
    id: string;

    /**
     * Nombre descriptivo del bloque.
     */
    nombre: string;
}
