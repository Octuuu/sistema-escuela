import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcryptjs';
import { ROLES } from '../config/roles.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM(...ROLES.ALL),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  hooks: {
    beforeSave: async (usuario) => {
      if (usuario.changed('password')) {
        usuario.password = await bcrypt.hash(usuario.password, 10);
      }
    }
  }
});

Usuario.prototype.validarPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default Usuario;