import mongoose, { Schema, Document } from 'mongoose';

export interface IHorarioTrabajo extends Document {
  dia: string; // Ejemplo: "lunes", "martes"
  inicio: string; // Ejemplo: "09:00"
  fin: string;   // Ejemplo: "17:00"
}

const horarioTrabajoSchema = new Schema({
  dia: {
    type: String,
    enum: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
    required: true,
  },
  inicio: { type: String, required: true },
  fin: { type: String, required: true },
}, {
  versionKey: false,
});

export default mongoose.model<IHorarioTrabajo>('HorarioTrabajo', horarioTrabajoSchema);
