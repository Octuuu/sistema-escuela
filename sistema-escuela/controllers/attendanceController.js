import Attendance from '../models/Attendance.js';

export const markAttendance = async (req, res) => {
  const { studentId, courseId, date, present } = req.body;

  try {
    const attendance = await Attendance.create({ studentId, courseId, date, present });
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar asistencia', error: err.message });
  }
};
