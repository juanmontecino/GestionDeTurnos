import { Schema, model } from "mongoose";

const ServicioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim:true
    },
    descripcion: {
        type: String,
        required: true,
        trim:true
    },
    precio: {
        type: Number,
        required: true,
        trim:true
    },
    duracion: {
        type: Number,
        required: true,
        trim:true
    }
}, { 
    versionKey: false
});

export default model("Servicio", ServicioSchema);