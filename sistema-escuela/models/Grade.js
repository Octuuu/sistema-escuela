import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Student from './Student.js';
import Course from './Course.js';

const Grade = sequelize.define('Grade', {
  score: { type: DataTypes.FLOAT, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false }
});

Grade.belongsTo(Student, { foreignKey: 'studentId' });
Grade.belongsTo(Course, { foreignKey: 'courseId' });

export default Grade;
