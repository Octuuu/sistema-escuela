import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Student = sequelize.define('Student', {
  userId: { type: DataTypes.INTEGER, allowNull: false, unique: true }
});

Student.belongsTo(User, { foreignKey: 'userId' });

export default Student;
