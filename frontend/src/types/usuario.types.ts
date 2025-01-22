export interface Usuario {
  _id?: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  password: string;
}

export interface UsuarioResponse {
  usuario: Usuario;
  message?: string;
}

export interface UsuariosResponse {
  usuarios: Usuario[];
  message?: string;
}