import { useState } from 'react';
import { 
  Container, 
  Button, 
  Tabs, 
  Tab, 
  Box, 
  AppBar, 
  Toolbar, 
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import { PersonAdd, AddBusiness, Event } from '@mui/icons-material';

// Importaciones de componentes de Usuario
import { UsuarioList } from './components/usuarios/UsuarioList';
import { UsuarioForm } from './components/usuarios/UsuarioForm';
import { Usuario } from './types/usuario.types';

// Importaciones de componentes de Servicio
import { ServicioList } from './components/servicios/ServicioList';
import { ServicioForm } from './components/servicios/ServicioForm';
import { Servicio } from './types/servicio.types';

// Importaciones de componentes de Turno
import { TurnoList } from './components/turnos/TurnoList';
import { TurnoForm } from './components/turnos/TurnoForm';
import { Turno } from './types/turno.types';

// Importación de tipos de error
import { CustomApiError } from './types/error.types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  
  const [usuarioModalOpen, setUsuarioModalOpen] = useState(false);
  const [servicioModalOpen, setServicioModalOpen] = useState(false);
  const [turnoModalOpen, setTurnoModalOpen] = useState(false);
  
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | undefined>();
  const [selectedServicio, setSelectedServicio] = useState<Servicio | undefined>();
  const [selectedTurno, setSelectedTurno] = useState<Turno | undefined>();

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });

  // Manejador genérico de errores
  const handleError = (error: unknown) => {
    const message = error instanceof CustomApiError
      ? error.message
      : 'Ocurrió un error inesperado';
    
    setSnackbar({
      open: true,
      message,
      severity: 'error'
    });
  };

  // Manejador genérico de éxito
  const handleSuccess = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'success'
    });
  };

  // Manejadores para usuarios
  const handleUsuarioEdit = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setUsuarioModalOpen(true);
  };

  const handleUsuarioSuccess = () => {
    setSelectedUsuario(undefined);
    handleSuccess('Usuario actualizado exitosamente');
    window.location.reload();
  };

  // Manejadores para servicios
  const handleServicioEdit = (servicio: Servicio) => {
    setSelectedServicio(servicio);
    setServicioModalOpen(true);
  };

  const handleServicioSuccess = () => {
    setSelectedServicio(undefined);
    handleSuccess('Servicio actualizado exitosamente');
    window.location.reload();
  };

  // Manejadores para turnos
  const handleTurnoEdit = (turno: Turno) => {
    setSelectedTurno(turno);
    setTurnoModalOpen(true);
  };

  const handleTurnoSuccess = () => {
    setSelectedTurno(undefined);
    handleSuccess('Turno actualizado exitosamente');
    window.location.reload();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Sistema de Gestión
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
          <Tabs 
            value={tabIndex} 
            onChange={(_, newValue) => setTabIndex(newValue)}
          >
            <Tab label="Usuarios" />
            <Tab label="Servicios" />
            <Tab label="Turnos" />
          </Tabs>
        </Box>

        <TabPanel value={tabIndex} index={0}>
          <Button 
            variant="contained" 
            onClick={() => setUsuarioModalOpen(true)}
            startIcon={<PersonAdd />}
            sx={{ mb: 2 }}
          >
            Nuevo Usuario
          </Button>
          
          <UsuarioList onEdit={handleUsuarioEdit} />
          
          <UsuarioForm
            usuario={selectedUsuario}
            open={usuarioModalOpen}
            onClose={() => {
              setUsuarioModalOpen(false);
              setSelectedUsuario(undefined);
            }}
            onSuccess={handleUsuarioSuccess}
          />
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Button 
            variant="contained" 
            onClick={() => setServicioModalOpen(true)}
            startIcon={<AddBusiness />}
            sx={{ mb: 2 }}
          >
            Nuevo Servicio
          </Button>
          
          <ServicioList onEdit={handleServicioEdit} />
          
          <ServicioForm
            servicio={selectedServicio}
            open={servicioModalOpen}
            onClose={() => {
              setServicioModalOpen(false);
              setSelectedServicio(undefined);
            }}
            onSuccess={handleServicioSuccess}
          />
        </TabPanel>

        <TabPanel value={tabIndex} index={2}>
          <Button 
            variant="contained" 
            onClick={() => setTurnoModalOpen(true)}
            startIcon={<Event />}
            sx={{ mb: 2 }}
          >
            Nuevo Turno
          </Button>
          
          <TurnoList onEdit={handleTurnoEdit} />
          
          <TurnoForm
            turno={selectedTurno}
            open={turnoModalOpen}
            onClose={() => {
              setTurnoModalOpen(false);
              setSelectedTurno(undefined);
            }}
            onSuccess={handleTurnoSuccess}
          />
        </TabPanel>

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
      </Container>
    </>
  );
}

export default App;