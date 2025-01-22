import { useState, useEffect } from 'react';
import { 
  TextField, Button, Stack, 
  Dialog, DialogTitle, 
  DialogContent, DialogActions 
} from '@mui/material';
import { Usuario } from '../../types/usuario.types';
import { usuariosService } from '../../services/usuarios.service';

interface Props {
  usuario?: Usuario;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const UsuarioForm = ({ usuario, open, onClose, onSuccess }: Props) => {
  const [formData, setFormData] = useState<Usuario>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: ''
  });

  useEffect(() => {
    if (usuario) {
      setFormData(usuario);
    }
  }, [usuario]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario?._id) {
      await usuariosService.update(usuario._id, formData);
    } else {
      await usuariosService.create(formData);
    }
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{usuario ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
            <TextField
              label="Apellido"
              value={formData.apellido}
              onChange={(e) => setFormData({...formData, apellido: e.target.value})}
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <TextField
              label="Teléfono"
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
            />
            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
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