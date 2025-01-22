import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import config from './routes/config';
import serviciosRoutes from './routes/servicios.routes';
import usuariosRoutes from './routes/usuarios.routes';
import turnosRoutes from './routes/turnos.routes';


const app = express();

app.set('port', config.PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(serviciosRoutes);
app.use(usuariosRoutes);
app.use(turnosRoutes);
export default app;