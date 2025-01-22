import { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale';
import { Turno } from '../../types/turno.types';
import { Usuario } from '../../types/usuario.types';
import { Servicio } from '../../types/servicio.types';
import { turnosService } from '../../services/turnos.service';
import { usuariosService } from '../../services/usuarios.service';
import { serviciosService } from '../../services/servicios.service';

interface Props {
  turno?: Turno;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const HORAS_DISPONIBLES = [
  '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00'
];

export const TurnoForm = ({ turno, open, onClose, onSuccess }: Props) => {
  const [formData, setFormData] = useState<any>({
    usuario: '',
    servicio: '',
    fecha: null,
    hora: '',
    estado: 'pendiente'
  });
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cargar usuarios y servicios al abrir el formulario
    const fetchData = async () => {
      try {
        const [usuariosData, serviciosData] = await Promise.all([
          usuariosService.getAll(),
          serviciosService.getAll()
        ]);
        setUsuarios(usuariosData);
        setServicios(serviciosData);
      } catch (error) {
        setError('Error al cargar datos necesarios');
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  useEffect(() => {
    if (turno) {
      setFormData({
        usuario: typeof turno.usuario === 'string' ? turno.usuario : turno.usuario._id,
        servicio: typeof turno.servicio === 'string' ? turno.servicio : turno.servicio._id,
        fecha: new Date(turno.fecha),
        hora: turno.hora,
        estado: turno.estado
      });
    }
  }, [turno]);

  // Modificar el manejo de fechas en handleSubmit
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        fecha: formData.fecha ? new Date(formData.fecha).toISOString() : null
      };
  
      if (turno?._id) {
        await turnosService.update(turno._id, formattedData);
      } else {
        await turnosService.create(formattedData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al guardar el turno');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {turno ? 'Editar Turno' : 'Nuevo Turno'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Usuario</InputLabel>
              <Select
                value={formData.usuario}
                label="Usuario"
                onChange={(e) => setFormData({...formData, usuario: e.target.value})}
                required
              >
                {usuarios.map((usuario) => (
                  <MenuItem key={usuario._id} value={usuario._id}>
                    {`${usuario.nombre} ${usuario.apellido}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Servicio</InputLabel>
              <Select
                value={formData.servicio}
                label="Servicio"
                onChange={(e) => setFormData({...formData, servicio: e.target.value})}
                required
              >
                {servicios.map((servicio) => (
                  <MenuItem key={servicio._id} value={servicio._id}>
                    {servicio.nombre} - ${servicio.precio}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DatePicker
                label="Fecha"
                value={formData.fecha}
                onChange={(newValue) => setFormData({...formData, fecha: newValue})}
                minDate={new Date()}
              />
            </LocalizationProvider>

            <FormControl fullWidth>
              <InputLabel>Hora</InputLabel>
              <Select
                value={formData.hora}
                label="Hora"
                onChange={(e) => setFormData({...formData, hora: e.target.value})}
                required
              >
                {HORAS_DISPONIBLES.map((hora) => (
                  <MenuItem key={hora} value={hora}>
                    {hora}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {turno && (
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={formData.estado}
                  label="Estado"
                  onChange={(e) => setFormData({...formData, estado: e.target.value})}
                >
                  <MenuItem value="pendiente">Pendiente</MenuItem>
                  <MenuItem value="confirmado">Confirmado</MenuItem>
                  <MenuItem value="cancelado">Cancelado</MenuItem>
                  <MenuItem value="completado">Completado</MenuItem>
                </Select>
              </FormControl>
            )}

            {error && (
              <FormHelperText error>{error}</FormHelperText>
            )}
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