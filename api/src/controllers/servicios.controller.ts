import { RequestHandler } from "express";
import Servicio from "../models/Servicio";

export const getServicios : RequestHandler = async (req, res) => {
   try {
     const servicios = await Servicio.find();
     res.json({
         servicios
     });
   } catch (error) {
    res.json({error});
   }
}

export const getServicio : RequestHandler = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);
        res.json({
            servicio
        });
    } catch (error) {
        res.status(404).json({error, message: "Servicio no encontrado"});
    }
}

export const postServicio : RequestHandler = async (req, res) => {
    try {
        const servicio = new Servicio(req.body);
        const servicioSaved = await servicio.save();
        res.json({
            message: "post servicio",
            servicioSaved
        });
    } catch (error) {
        res.status(400).json ({error, message: "Error al crear servicio"});
    }
}

export const updateServicio : RequestHandler = async (req, res) => {
   try {
        const servicio = await Servicio.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
            message: "Servicio actualizado",
            servicio
        });
    } catch (error) {
        res.status(404).json({error, message: "Servicio no encontrado"});
    }
}

export const deleteServicio : RequestHandler = async (req, res) => {
    try {
        const servicio = await Servicio.findByIdAndDelete(req.params.id);
        res.json({
            message: "Servicio eliminado",
            servicio
        });
    } catch (error) {
        res.status(404).json({error, message: "Servicio no encontrado"});
    }
}

