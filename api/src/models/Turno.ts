import mongoose, { Schema, Document } from 'mongoose';

export interface ITurno extends Document {
  usuario: mongoose.Types.ObjectId;
  servicio: mongoose.Types.ObjectId;
  fecha: Date;
  hora: string;
  estado: 'pendiente' | 'confirmado' | 'cancelado' | 'completado';
  createdAt: Date;
  updatedAt: Date;
}

const turnoSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El usuario es obligatorio']
  },
  servicio: {
    type: Schema.Types.ObjectId,
    ref: 'Servicio',
    required: [true, 'El servicio es obligatorio']
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es obligatoria']
  },
  hora: {
    type: String,
    required: [true, 'La hora es obligatoria']
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'cancelado', 'completado'],
    default: 'pendiente'
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model<ITurno>('Turno', turnoSchema);