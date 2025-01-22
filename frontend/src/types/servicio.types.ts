/**
 * Interfaz base para el modelo de Servicio
 * Las interfaces en TypeScript nos permiten definir la estructura de un objeto
 * El signo '?' indica que la propiedad es opcional
 */
export interface Servicio {
    _id?: string;              // ID único del servicio (opcional porque es asignado por MongoDB)
    nombre: string;            // Nombre del servicio
    descripcion: string;       // Descripción detallada
    duracion: number;          // Duración en minutos
    precio: number;            // Precio del servicio
    disponible: boolean;       // Indica si el servicio está actualmente disponible
  }
  
  /**
   * Interfaces para las respuestas de la API
   * Estas interfaces extienden la lógica de respuesta que ya teníamos para usuarios
   */
  export interface ServicioResponse {
    servicio: Servicio;
    message?: string;
  }
  
  export interface ServiciosResponse {
    servicios: Servicio[];
    message?: string;
  }