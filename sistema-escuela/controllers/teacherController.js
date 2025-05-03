import Teacher from '../models/Teacher.js';
import User from '../models/User.js';

export const getProfile = async (req, res) => {
  const teacherId = req.user.id;

  try {
    const teacher = await Teacher.findOne({ where: { userId: teacherId }, include: User });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener perfil', error: err.message });
  }
};
