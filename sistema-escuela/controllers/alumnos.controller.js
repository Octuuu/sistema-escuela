import Alumno from '../models/alumno.model.js';
import Usuario from '../models/usuario.model.js';
import Curso from '../models/curso.model.js';

export const listarAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.findAll({
      include: [
        { model: Usuario, attributes: ['email', 'rol', 'activo'] },
        { model: Curso, attributes: ['nombre', 'nivel', 'turno'] }
      ]
    });
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findByPk(req.params.id, {
      include: [
        { model: Usuario, attributes: ['email', 'rol', 'activo'] },
        { model: Curso, attributes: ['nombre', 'nivel', 'turno'] }
      ]
    });

    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    res.json(alumno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearAlumno = async (req, res) => {
  try {
    const { usuario_id, curso_id, ...datosAlumno } = req.body;
    const alumno = await Alumno.create({
      ...datosAlumno,
      usuario_id,
      curso_id
    });
    res.status(201).json(alumno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const actualizarAlumno = async (req, res) => {
  try {
    const [updated] = await Alumno.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    const alumnoActualizado = await Alumno.findByPk(req.params.id);
    res.json(alumnoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarAlumno = async (req, res) => {
  try {
    const deleted = await Alumno.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};