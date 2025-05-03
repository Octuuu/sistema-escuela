import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Student from './Student.js';
import Course from './Course.js';

const Attendance = sequelize.define('Attendance', {
  date: { type: DataTypes.DATEONLY, allowNull: false },
  present: { type: DataTypes.BOOLEAN, defaultValue: false }
});

Attendance.belongsTo(Student, { foreignKey: 'studentId' });
Attendance.belongsTo(Course, { foreignKey: 'courseId' });

export default Attendance;
