// src/types/error.types.ts

/**
 * Interfaz que define la estructura estándar de errores en la aplicación
 * Útil para mantener consistencia en el manejo de errores a través de la app
 */
export interface ApiError {
    message: string;       // Mensaje descriptivo del error
    code?: string;         // Código de error opcional (ej: "AUTH001")
    status?: number;       // Código de estado HTTP
  }
  
  /**
   * Clase personalizada para errores de la API
   * Extiende la clase Error nativa de JavaScript
   * @extends Error
   */
  export class CustomApiError extends Error {
    code?: string;
    status?: number;
  
    constructor(message: string, code?: string, status?: number) {
      super(message);
      this.name = 'CustomApiError';
      this.code = code;
      this.status = status;
    }
  }