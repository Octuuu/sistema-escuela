import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Teacher from './Teacher.js';

const Course = sequelize.define('Course', {
  name: { type: DataTypes.STRING, allowNull: false }
});

Course.belongsTo(Teacher, { foreignKey: 'teacherId' });

export default Course;
