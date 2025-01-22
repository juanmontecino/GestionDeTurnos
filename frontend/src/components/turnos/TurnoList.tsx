import { useState, useEffect } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Chip,
  Typography,
  Alert,
  Snackbar
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Turno } from '../../types/turno.types';
import { turnosService } from '../../services/turnos.service';
import { CustomApiError } from '../../types/error.types';

interface Props {
  onEdit: (turno: Turno) => void;
}

// Definimos un tipo específico para los colores permitidos del Chip
type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

const getEstadoColor = (estado: string): ChipColor => {
  const colors: Record<string, ChipColor> = {
    pendiente: 'warning',
    confirmado: 'info',
    cancelado: 'error',
    completado: 'success'
  };
  return colors[estado] || 'default';
};

export const TurnoList = ({ onEdit }: Props) => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const loadTurnos = async () => {
    try {
      setError(null); // Limpiar error previo
      const data = await turnosService.getAll();
      setTurnos(data);
    } catch (err) {
      console.error('Error loading turnos:', err);
      const errorMessage = err instanceof CustomApiError 
        ? err.message 
        : 'Error al cargar los turnos. Por favor, intente nuevamente.';
      setError(errorMessage);
    }
  };

  useEffect(() => {
    loadTurnos();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este turno?')) {
      try {
        await turnosService.delete(id);
        setSnackbar({
          open: true,
          message: 'Turno eliminado exitosamente',
          severity: 'success'
        });
        await loadTurnos();
      } catch (err) {
        const apiError = err instanceof CustomApiError
          ? err.message
          : 'Error al eliminar el turno';
        setSnackbar({
          open: true,
          message: apiError,
          severity: 'error'
        });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Servicio</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {turnos.map((turno) => (
              <TableRow key={turno._id}>
                <TableCell>
                  {typeof turno.usuario === 'string' 
                    ? turno.usuario 
                    : `${turno.usuario.nombre} ${turno.usuario.apellido}`}
                </TableCell>
                <TableCell>
                  {typeof turno.servicio === 'string'
                    ? turno.servicio
                    : turno.servicio.nombre}
                </TableCell>
                <TableCell>
                  {format(new Date(turno.fecha), 'dd/MM/yyyy', { locale: es })}
                </TableCell>
                <TableCell>{turno.hora}</TableCell>
                <TableCell>
                  <Chip 
                    label={turno.estado.charAt(0).toUpperCase() + turno.estado.slice(1)}
                    color={getEstadoColor(turno.estado)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(turno)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => turno._id && handleDelete(turno._id)} 
                    size="small" 
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          elevation={6} 
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};