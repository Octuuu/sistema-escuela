import Asistencia from '../models/asistencia.model.js';
import Alumno from '../models/alumno.model.js';

export const listarAsistencias = async (req, res) => {
  try {
    const asistencias = await Asistencia.findAll({
      include: [
        { model: Alumno, attributes: ['nombre', 'apellido'] }
      ]
    });
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerAsistencia = async (req, res) => {
  try {
    const asistencia = await Asistencia.findByPk(req.params.id, {
      include: [
        { model: Alumno, attributes: ['nombre', 'apellido'] }
      ]
    });

    if (!asistencia) {
      return res.status(404).json({ error: 'Asistencia no encontrada' });
    }

    res.json(asistencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearAsistencia = async (req, res) => {
  try {
    const asistencia = await Asistencia.create(req.body);
    res.status(201).json(asistencia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const actualizarAsistencia = async (req, res) => {
  try {
    const [updated] = await Asistencia.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Asistencia no encontrada' });
    }

    const asistenciaActualizada = await Asistencia.findByPk(req.params.id);
    res.json(asistenciaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarAsistencia = async (req, res) => {
  try {
    const deleted = await Asistencia.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Asistencia no encontrada' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const asistenciasPorAlumno = async (req, res) => {
  try {
    const asistencias = await Asistencia.findAll({
      where: { alumno_id: req.params.alumnoId },
      order: [['fecha', 'DESC']]
    });
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registrarAsistenciasMasivas = async (req, res) => {
  try {
    const { curso_id, fecha, asistencias } = req.body;
    
    const registros = await Promise.all(
      asistencias.map(async ({ alumno_id, estado, observaciones }) => {
        return await Asistencia.create({
          alumno_id,
          fecha,
          estado,
          observaciones
        });
      })
    );

    res.status(201).json(registros);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};