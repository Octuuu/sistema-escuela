import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Asistencia = sequelize.define('Asistencia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.ENUM('presente', 'ausente', 'justificado', 'tarde'),
    allowNull: false
  },
  observaciones: {
    type: DataTypes.TEXT
  }
});

export default Asistencia;