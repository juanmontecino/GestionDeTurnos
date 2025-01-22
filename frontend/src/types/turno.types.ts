// src/types/turno.types.ts
import { Servicio } from './servicio.types';
import { Usuario } from './usuario.types';

export interface Turno {
  _id: string;
  usuario: Usuario | string;
  nombreUsuario: string;
  servicio: Servicio | string;
  nombreServicio: string;
  fecha: string;
  hora: string;
  estado: string;
}

export interface TurnoResponse {
  turno: Turno;
  message?: string;
}

export interface TurnosResponse {
  turnos: Turno[];
  message?: string;
}