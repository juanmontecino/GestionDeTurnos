// src/services/api.config.ts
import axios from 'axios';
import { CustomApiError } from '../types/error.types'; // Ajusta la ruta si es necesario


export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/', // Ajusta esto a tu URL base
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      throw new CustomApiError(
        error.response.data.message,
        error.response.data.code,
        error.response.status
      );
    }
    throw new CustomApiError('Error de red');
  }
);