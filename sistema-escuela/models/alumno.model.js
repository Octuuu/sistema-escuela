import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Alumno = sequelize.define('Alumno', {
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
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  foto: {
    type: DataTypes.STRING
  }
});

export default Alumno;