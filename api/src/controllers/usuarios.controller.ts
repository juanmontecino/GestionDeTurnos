import { RequestHandler } from "express";
import Usuario from "../models/Usuario";

export const getUsuarios : RequestHandler = async (req, res) => {
   try {
     const usuarios = await Usuario.find();
     res.json({
         usuarios
     });
   } catch (error) {
    res.json({error});
   }
}

export const getUsuario : RequestHandler = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        res.json({
            usuario
        });
    } catch (error) {
        res.status(404).json({error, message: "Usuario no encontrado"});
    }
}

export const postUsuario : RequestHandler = async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        const usuarioSaved = await usuario.save();
        res.json({
            message: "post usuario",
            usuarioSaved
        });
    } catch (error) {
        res.status(400).json ({error, message: "Error al crear usuario"});
    }
}

export const updateUsuario : RequestHandler = async (req, res) => {
   try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
            message: "Usuario actualizado",
            usuario
        });
    } catch (error) {
        res.status(404).json({error, message: "Usuario no encontrado"});
    }
}

export const deleteUsuario : RequestHandler = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        res.json({
            message: "Usuario eliminado",
            usuario
        });
    } catch (error) {
        res.status(404).json({error, message: "Usuario no encontrado"});
    }
}