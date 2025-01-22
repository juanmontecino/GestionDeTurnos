import { Router } from 'express';
import * as turnosController from '../controllers/turnos.controller';

const router = Router();

router.get('/turnos', turnosController.getTurnos);
router.get('/turnos/:id', turnosController.getTurno);
router.get('/turnos/disponibles', turnosController.getTurnosDisponibles);
router.post('/turnos', turnosController.postTurno);
router.put('/turnos/:id', turnosController.updateTurno);
router.delete('/turnos/:id', turnosController.deleteTurno);

export default router;