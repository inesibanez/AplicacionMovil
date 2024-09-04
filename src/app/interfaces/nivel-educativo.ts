/**
 * Interface que representa un Nivel educativo en el sistema.
 * Un nivel educativo es una entidad que representa una etapa escolar (e.g., primaria, secundaria).
 */
export interface NivelEducativo {
	
	/**
     * Identificador único del nivel educativo.
     */
    id: string;
	
	/**
     * Nombre descriptivo del nivel educativo.
     */
    nombre: string;
}
