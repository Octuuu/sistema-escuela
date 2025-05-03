import Grade from '../models/Grade.js';

export const addGrade = async (req, res) => {
  const { studentId, courseId, score, date } = req.body;

  try {
    const grade = await Grade.create({ studentId, courseId, score, date });
    res.status(201).json(grade);
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar nota', error: err.message });
  }
};
