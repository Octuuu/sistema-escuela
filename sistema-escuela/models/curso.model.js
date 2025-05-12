import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Curso = sequelize.define('Curso', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nivel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  turno: {
    type: DataTypes.ENUM('mañana', 'tarde', 'noche'),
    allowNull: false
  },
  año_lectivo: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Curso;