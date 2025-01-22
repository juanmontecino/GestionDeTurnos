import { Turno, TurnoResponse, TurnosResponse } from '../types/turno.types';
import { apiClient } from './api.config';
import { serviciosService } from './servicios.service'; // Suponiendo que tienes un servicio para servicio
import { usuariosService } from './usuarios.service'; // Suponiendo que tienes un servicio para usuario


class TurnosService {
  private readonly baseUrl = '/turnos';

  // Modificar para obtener detalles de usuario y servicio
  async getAll() {
    try {
      const { data } = await apiClient.get<TurnosResponse>(this.baseUrl);
      const turnosConDetalles = await Promise.all(data.turnos.map(async (turno) => {
        const usuario = await usuariosService.getById(turno.usuario as string);
        const servicio = await serviciosService.getById(turno.servicio as string);
        return { ...turno, usuario, servicio };
      }));
      return turnosConDetalles;
    } catch (error) {
      throw this.handleError(error, 'Error al obtener los turnos');
    }
  }

  async getById(id: string) {
    try {
      const { data } = await apiClient.get<TurnoResponse>(`${this.baseUrl}/${id}`);
      const usuario = await usuariosService.getById(data.turno.usuario as string);
      const servicio = await serviciosService.getById(data.turno.servicio as string);
      return { ...data.turno, usuario, servicio };
    } catch (error) {
      throw this.handleError(error, 'Error al obtener el turno');
    }
  }

  async create(turno: Omit<Turno, '_id'>) {
    try {
      const { data } = await apiClient.post<TurnoResponse>(this.baseUrl, turno);
      return data.turno;
    } catch (error) {
      throw this.handleError(error, 'Error al crear el turno');
    }
  }

  async update(id: string, turno: Partial<Turno>) {
    try {
      const { data } = await apiClient.put<TurnoResponse>(`${this.baseUrl}/${id}`, turno);
      return data.turno;
    } catch (error) {
      throw this.handleError(error, 'Error al actualizar el turno');
    }
  }

  async delete(id: string) {
    try {
      await apiClient.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      throw this.handleError(error, 'Error al eliminar el turno');
    }
  }

  private handleError(error: any, defaultMessage: string): Error {
    if (typeof error === 'string') return new Error(error);
    return new Error(error.message || defaultMessage);
  }
}

export const turnosService = new TurnosService();
