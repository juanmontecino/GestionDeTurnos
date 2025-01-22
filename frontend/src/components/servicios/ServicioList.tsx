// components/servicios/ServicioList.tsx
/**
 * Componente para mostrar y gestionar la lista de servicios
 * Implementa una tabla con funcionalidades de edición y eliminación
 */
import { useState, useEffect } from 'react';
import { 
  Alert, 
  Snackbar,
  CircularProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Chip
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { serviciosService } from '../../services/servicios.service';
import { Servicio } from '../../types/servicio.types';

interface Props {
  onEdit: (servicio: Servicio) => void;
}

export const ServicioList = ({ onEdit }: Props) => {
  // Estados para manejar la lista de servicios y estados de UI
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar la lista de servicios
  const fetchServicios = async () => {
    try {
      setLoading(true);
      const data = await serviciosService.getAll();
      setServicios(data);
    } catch (error) {
        console.error('Error fetching servicios:', error);
      setError(error instanceof Error ? error.message : 'Error al cargar servicios');
    } finally {
      setLoading(false);
    }
  };

  // Cargar servicios al montar el componente
  useEffect(() => {
    fetchServicios();
  }, []);

  // Manejador para eliminar servicios
  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este servicio?')) {
      try {
        await serviciosService.delete(id);
        await fetchServicios(); // Recargar la lista después de eliminar
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error al eliminar servicio');
      }
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Duración (min)</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servicios.map((servicio) => (
              <TableRow key={servicio._id}>
                <TableCell>{servicio.nombre}</TableCell>
                <TableCell>{servicio.descripcion}</TableCell>
                <TableCell>{servicio.duracion}</TableCell>
                <TableCell>${servicio.precio}</TableCell>
                <TableCell>
                  <Chip 
                    label={servicio.disponible ? 'Disponible' : 'No disponible'}
                    color={servicio.disponible ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(servicio)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => servicio._id && handleDelete(servicio._id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};