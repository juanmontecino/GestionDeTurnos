// src/types/api.types.ts
export interface ApiResponse<T> {
    data: T;
    message?: string;
    error?: string;
  }
