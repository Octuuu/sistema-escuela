import Curso from '../models/curso.model.js';
import Alumno from '../models/alumno.model.js';
import Materia from '../models/materia.model.js';

export const listarCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll({
      include: [
        {
          model: Alumno,
          attributes: ['nombre', 'apellido'],
          limit: 5 // Limitar alumnos para no sobrecargar la respuesta
        },
        {
          model: Materia,
          attributes: ['nombre', 'descripcion'],
          through: { attributes: [] } // No mostrar tabla intermedia
        }
      ]
    });
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id, {
      include: [
        {
          model: Alumno,
          attributes: ['id', 'nombre', 'apellido']
        },
        {
          model: Materia,
          attributes: ['id', 'nombre', 'descripcion'],
          through: { attributes: [] }
        }
      ]
    });

    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    res.json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearCurso = async (req, res) => {
  try {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const actualizarCurso = async (req, res) => {
  try {
    const [updated] = await Curso.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    const cursoActualizado = await Curso.findByPk(req.params.id);
    res.json(cursoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarCurso = async (req, res) => {
  try {
    const deleted = await Curso.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const agregarMateriaACurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.cursoId);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    const materia = await Materia.findByPk(req.params.materiaId);
    if (!materia) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    await curso.addMateria(materia);
    res.json({ message: 'Materia agregada al curso correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const quitarMateriaDeCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.cursoId);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    const materia = await Materia.findByPk(req.params.materiaId);
    if (!materia) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    await curso.removeMateria(materia);
    res.json({ message: 'Materia quitada del curso correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};