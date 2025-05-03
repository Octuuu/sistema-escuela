import Grade from '../models/Grade.js';
import Attendance from '../models/Attendance.js';

export const getGrades = async (req, res) => {
  const studentId = req.user.id;

  try {
    const grades = await Grade.findAll({ where: { studentId } });
    res.json(grades);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener notas', error: err.message });
  }
};

export const getAttendance = async (req, res) => {
  const studentId = req.user.id;

  try {
    const attendance = await Attendance.findAll({ where: { studentId } });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener asistencia', error: err.message });
  }
};
