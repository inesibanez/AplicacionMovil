/**
 * Interface que representa un Recurso en el sistema.
 * Un recurso es una entidad que contiene toda la información que necesitamos para trabajar con los Applets de GeoGecra.
 */
 export interface Recurso {
	 
	/**
     * Identificador único del recurso.
     */
    id: string;

    /**
     * Identificador de la búsqueda asociada al recurso.
     */
    idBusqueda: string;

    /**
     * Identificador de la clase a la que pertenece el recurso.
     */
    idClase: string;

    /**
     * Identificador del bloque temático al que pertenece el recurso.
     */
    idBloque: string;

    /**
     * Nombre descriptivo del recurso.
     */
    nombre: string;

    /**
     * Instrucciones específicas para el uso del recurso.
     */
    instrucciones: string;

    /**
     * Enlace al applet de GeoGebra asociado al recurso.
     */
    enlace: string;

    /**
     * Enlace a un video relacionado con el recurso.
     */
    enlaceVideo: string;

    /**
     * Enlace a una imagen relacionada con el recurso.
     */
    enlaceImagen: string;

    /**
     * Nombre del autor del recurso.
     */
    autor: string;

    /**
     * Orden en que se debe mostrar el recurso en listas o colecciones.
     */
    orden: number;

    /**
     * Enlace a un recurso adaptado, si está disponible.
     */
    recursoAdaptado: string;

    /**
     * Observaciones adicionales sobre el recurso.
     */
    observaciones: string;

    /**
     * Indica si el recurso ha sido marcado como realizado por el usuario.
     */
    realizado: boolean;

    /**
     * Indica si el recurso ha sido marcado como favorito por el usuario.
     */
    favorito: boolean;

    /**
     * Indica si el recurso ha sido marcado como visto por el usuario.
     */
    visto: boolean;
}
