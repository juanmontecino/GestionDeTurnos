/**
 * Componente de formulario para crear y editar servicios
 * Utiliza Material-UI para la interfaz de usuario
 */
import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Stack, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Switch,
  FormControlLabel
} from '@mui/material';
import { Servicio } from '../../types/servicio.types';
import { serviciosService } from '../../services/servicios.service';

// Definición de las props del componente usando una interfaz
interface Props {
  servicio?: Servicio;          // Servicio existente para edición (opcional)
  open: boolean;                // Controla si el diálogo está abierto
  onClose: () => void;          // Función para cerrar el diálogo
  onSuccess: () => void;        // Callback ejecutado al completar la operación
}

export const ServicioForm = ({ servicio, open, onClose, onSuccess }: Props) => {
  // Estado local para los datos del formulario
  const [formData, setFormData] = useState<Servicio>({
    nombre: '',
    descripcion: '',
    duracion: 30,
    precio: 0,
    disponible: true
  });

  // Efecto para cargar los datos cuando se edita un servicio existente
  useEffect(() => {
    if (servicio) {
      setFormData(servicio);
    }
  }, [servicio]);

  // Manejador para el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (servicio?._id) {
        await serviciosService.update(servicio._id, formData);
      } else {
        await serviciosService.create(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error al guardar el servicio:', error);
      // Aquí podrías manejar el error mostrando un mensaje al usuario
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {servicio ? 'Editar Servicio' : 'Nuevo Servicio'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              required
            />
            <TextField
              label="Descripción"
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              multiline
              rows={3}
              required
            />
            <TextField
              label="Duración (minutos)"
              type="number"
              value={formData.duracion}
              onChange={(e) => setFormData({...formData, duracion: Number(e.target.value)})}
              required
            />
            <TextField
              label="Precio"
              type="number"
              value={formData.precio}
              onChange={(e) => setFormData({...formData, precio: Number(e.target.value)})}
              required
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.disponible}
                  onChange={(e) => setFormData({...formData, disponible: e.target.checked})}
                />
              }
              label="Disponible"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};