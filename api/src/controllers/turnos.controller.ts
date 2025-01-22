import { RequestHandler } from "express";
import Turno from "../models/Turno";

export const getTurnos: RequestHandler = async (req, res) => {
    try {
        const turnos = await Turno.find();
        res.json({
            turnos
        });
    } catch (error) {
        res.json({ error });
    }
}

export const getTurno: RequestHandler = async (req, res) => {
    try {
        const turno = await Turno.findById(req.params.id);
        if (!turno) {
            res.status(404).json({ message: "Turno no encontrado" });
        } else {
            res.json({
                turno
            });
        }
    } catch (error) {
        res.status(404).json({ error, message: "Turno no encontrado" });
    }
}

export const getTurnosDisponibles: RequestHandler = async (req, res) => {
    try {
        const turnosDisponibles = await Turno.find({ estado: 'disponible' });
        res.json({
            turnosDisponibles
        });
    } catch (error) {
        res.json({ error });
    }
}

export const postTurno: RequestHandler = async (req, res) => {
    try {
        const existingTurno = await Turno.findOne({
            fecha: req.body.fecha,
            hora: req.body.hora,
            estado: { $ne: 'cancelado' }
        });

        if (existingTurno) {
            res.status(400).json({ message: "Horario no disponible" });
        } else {
            const turno = new Turno(req.body);
            const turnoSaved = await turno.save();
            
            const turnoPopulado = await Turno.findById(turnoSaved._id)
                .populate('usuario', 'nombre apellido email')
                .populate('servicio', 'nombre duracion precio');

            res.json({
                message: "Turno creado exitosamente",
                turno: turnoPopulado
            });
        }
    } catch (error) {
        res.status(400).json({ error, message: "Error al crear turno" });
    }
}

export const updateTurno: RequestHandler = async (req, res) => {
    try {
        if (req.body.fecha || req.body.hora) {
            const existingTurno = await Turno.findOne({
                _id: { $ne: req.params.id },
                fecha: req.body.fecha || undefined,
                hora: req.body.hora || undefined,
                estado: { $ne: 'cancelado' }
            });

            if (existingTurno) {
                res.status(400).json({ message: "Horario no disponible" });
                return;
            }
        }

        const turno = await Turno.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        ).populate('usuario servicio');

        if (!turno) {
            res.status(404).json({ message: "Turno no encontrado" });
        } else {
            res.json({
                message: "Turno actualizado",
                turno
            });
        }
    } catch (error) {
        res.status(404).json({ error, message: "Error al actualizar turno" });
    }
}

export const deleteTurno: RequestHandler = async (req, res) => {
    try {
        const turno = await Turno.findByIdAndDelete(req.params.id);
        if (!turno) {
            res.status(404).json({ message: "Turno no encontrado" });
        } else {
            res.json({
                message: "Turno eliminado",
                turno
            });
        }
    } catch (error) {
        res.status(404).json({ error, message: "Error al eliminar turno" });
    }
}


