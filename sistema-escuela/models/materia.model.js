import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Materia = sequelize.define('Materia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  carga_horaria: {
    type: DataTypes.INTEGER
  }
});

export default Materia;