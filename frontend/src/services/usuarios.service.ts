import { apiClient } from './api.config';
  import { Usuario, UsuarioResponse, UsuariosResponse } from '../types/usuario.types';
  
  class UsuariosService {
    private readonly baseUrl = '/usuarios';
  
    async getAll() {
      try {
        const { data } = await apiClient.get<UsuariosResponse>(this.baseUrl);
        return data.usuarios;
      } catch (error) {
        throw this.handleError(error, 'Error al obtener usuarios');
      }
    }
  
    async getById(id: string) {
      try {
        const { data } = await apiClient.get<UsuarioResponse>(`${this.baseUrl}/${id}`);
        return data.usuario;
      } catch (error) {
        throw this.handleError(error, 'Error al obtener el usuario');
      }
    }
  
    async create(usuario: Omit<Usuario, '_id'>) {
      try {
        const { data } = await apiClient.post<UsuarioResponse>(this.baseUrl, usuario);
        return data.usuario;
      } catch (error) {
        throw this.handleError(error, 'Error al crear el usuario');
      }
    }
  
    async update(id: string, usuario: Partial<Usuario>) {
      try {
        const { data } = await apiClient.put<UsuarioResponse>(`${this.baseUrl}/${id}`, usuario);
        return data.usuario;
      } catch (error) {
        throw this.handleError(error, 'Error al actualizar el usuario');
      }
    }
  
    async delete(id: string) {
      try {
        const { data } = await apiClient.delete<UsuarioResponse>(`${this.baseUrl}/${id}`);
        return data.usuario;
      } catch (error) {
        throw this.handleError(error, 'Error al eliminar el usuario');
      }
    }
  
    private handleError(error: any, defaultMessage: string): Error {
      if (typeof error === 'string') return new Error(error);
      return new Error(error.message || defaultMessage);
    }
  }
  
  export const usuariosService = new UsuariosService();