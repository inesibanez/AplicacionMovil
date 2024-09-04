/**
 * Interface que representa una Modalidad en el sistema.
 * Una modalidad es una entidad que puede representar distintos temarios dentro de un mismo curso y nivel educativo.
 * Si una combinación de curso y nivel educativo no oferta distintos temarios a los alumnos, se selecciona automáticamente "Ordinaria".
 */
export interface Modalidad {
	
	/**
     * Identificador único de la modalidad.
     */
    id: string;
	
	/**
     * Nombre descriptivo de la modalidad.
     */
    nombre: string;
}
