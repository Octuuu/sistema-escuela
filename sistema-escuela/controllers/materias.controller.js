import Materia from '../models/materia.model.js';
import Docente from '../models/docente.model.js';

export const listarMaterias = async (req, res) => {
  try {
    const materias = await Materia.findAll({
      include: [
        { model: Docente, attributes: ['nombre', 'apellido', 'especialidad'] }
      ]
    });
    res.json(materias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerMateria = async (req, res) => {
  try {
    const materia = await Materia.findByPk(req.params.id, {
      include: [
        { model: Docente, attributes: ['nombre', 'apellido', 'especialidad'] },
        {
          association: 'Cursos',
          attributes: ['nombre', 'nivel', 'turno']
        }
      ]
    });

    if (!materia) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    res.json(materia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearMateria = async (req, res) => {
  try {
    const materia = await Materia.create(req.body);
    res.status(201).json(materia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const actualizarMateria = async (req, res) => {
  try {
    const [updated] = await Materia.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    const materiaActualizada = await Materia.findByPk(req.params.id);
    res.json(materiaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarMateria = async (req, res) => {
  try {
    const deleted = await Materia.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};