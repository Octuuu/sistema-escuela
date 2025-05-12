import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Docente = sequelize.define('Docente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  titulo: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  especialidad: {
    type: DataTypes.STRING
  }
});

export default Docente;