import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Teacher = sequelize.define('Teacher', {
  userId: { type: DataTypes.INTEGER, allowNull: false, unique: true }
});

Teacher.belongsTo(User, { foreignKey: 'userId' });

export default Teacher;
