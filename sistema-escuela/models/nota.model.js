import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Nota = sequelize.define('Nota', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  calificacion: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },
  tipo_evaluacion: {
    type: DataTypes.ENUM('parcial', 'final', 'trabajo_practico', 'proyecto'),
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  comentario: {
    type: DataTypes.TEXT
  }
});

export default Nota;