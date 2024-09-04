import { Recurso } from "./recurso";

/**
 * Interface que representa un Cuatro en el sistema.
 * Un "cuatro" es una agrupación que contiene cuatro recursos para pintarlos juntos en el listado de recursos.
 */
export interface Cuatro {
	
	/**
     * Recurso que aparecerá arriba a la izquierda en el cuarteto.
     */
    recurso0: Recurso;
	
	/**
     * Recurso que aparecerá arriba a la derecha en el cuarteto.
     */
    recurso1: Recurso;
	
	/**
     * Recurso que aparecerá abajo a la izquierda en el cuarteto.
     */
    recurso2: Recurso;
	
	/**
     * Recurso que aparecerá abajo a la derecha en el cuarteto.
     */
    recurso3: Recurso;
}

