/**
 * Clase de servicio para manejar las operaciones CRUD de servicios
 * Sigue el patrón Singleton a través de la exportación de una instancia única
 */
import { Servicio, ServicioResponse, ServiciosResponse } from '../types/servicio.types';
import { apiClient } from './api.config';

class ServiciosService {
  // Definimos la URL base para los endpoints de servicios
  private readonly baseUrl = '/servicios';

  /**
   * Obtiene todos los servicios disponibles
   * @returns Promise<Servicio[]>
   */
  async getAll() {
    try {
      const { data } = await apiClient.get<ServiciosResponse>(this.baseUrl);
      return data.servicios;
    } catch (error) {
      throw this.handleError(error, 'Error al obtener servicios');
    }
  }

  /**
   * Obtiene un servicio específico por su ID
   * @param id - ID del servicio
   * @returns Promise<Servicio>
   */
  async getById(id: string) {
    try {
      const { data } = await apiClient.get<ServicioResponse>(`${this.baseUrl}/${id}`);
      return data.servicio;
    } catch (error) {
      throw this.handleError(error, 'Error al obtener el servicio');
    }
  }

  /**
   * Crea un nuevo servicio
   * @param servicio - Datos del nuevo servicio (sin ID)
   * @returns Promise<Servicio>
   */
  async create(servicio: Omit<Servicio, '_id'>) {
    try {
      const { data } = await apiClient.post<ServicioResponse>(this.baseUrl, servicio);
      return data.servicio;
    } catch (error) {
      throw this.handleError(error, 'Error al crear el servicio');
    }
  }

  /**
   * Actualiza un servicio existente
   * @param id - ID del servicio a actualizar
   * @param servicio - Datos parciales o completos del servicio
   * @returns Promise<Servicio>
   */
  async update(id: string, servicio: Partial<Servicio>) {
    try {
      const { data } = await apiClient.put<ServicioResponse>(`${this.baseUrl}/${id}`, servicio);
      return data.servicio;
    } catch (error) {
      throw this.handleError(error, 'Error al actualizar el servicio');
    }
  }

  /**
   * Elimina un servicio por su ID
   * @param id - ID del servicio a eliminar
   * @returns Promise<Servicio>
   */
  async delete(id: string) {
    try {
      const { data } = await apiClient.delete<ServicioResponse>(`${this.baseUrl}/${id}`);
      return data.servicio;
    } catch (error) {
      throw this.handleError(error, 'Error al eliminar el servicio');
    }
  }

  /**
   * Método privado para manejar errores de manera consistente
   * @param error - Error capturado
   * @param defaultMessage - Mensaje por defecto
   * @returns Error
   */
  private handleError(error: any, defaultMessage: string): Error {
    if (typeof error === 'string') return new Error(error);
    return new Error(error.message || defaultMessage);
  }
}

// Exportamos una única instancia del servicio (patrón Singleton)
export const serviciosService = new ServiciosService();