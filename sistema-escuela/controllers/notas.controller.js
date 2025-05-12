import Nota from '../models/nota.model.js';
import Alumno from '../models/alumno.model.js';
import Materia from '../models/materia.model.js';

export const listarNotas = async (req, res) => {
  try {
    const notas = await Nota.findAll({
      include: [
        { model: Alumno, attributes: ['nombre', 'apellido'] },
        { model: Materia, attributes: ['nombre'] }
      ]
    });
    res.json(notas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerNota = async (req, res) => {
  try {
    const nota = await Nota.findByPk(req.params.id, {
      include: [
        { model: Alumno, attributes: ['nombre', 'apellido'] },
        { model: Materia, attributes: ['nombre', 'descripcion'] }
      ]
    });

    if (!nota) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    res.json(nota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearNota = async (req, res) => {
  try {
    const nota = await Nota.create(req.body);
    res.status(201).json(nota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const actualizarNota = async (req, res) => {
  try {
    const [updated] = await Nota.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    const notaActualizada = await Nota.findByPk(req.params.id);
    res.json(notaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarNota = async (req, res) => {
  try {
    const deleted = await Nota.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const notasPorAlumno = async (req, res) => {
  try {
    const notas = await Nota.findAll({
      where: { alumno_id: req.params.alumnoId },
      include: [
        { model: Materia, attributes: ['nombre'] }
      ]
    });
    res.json(notas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const notasPorMateria = async (req, res) => {
  try {
    const notas = await Nota.findAll({
      where: { materia_id: req.params.materiaId },
      include: [
        { model: Alumno, attributes: ['nombre', 'apellido'] }
      ]
    });
    res.json(notas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};