import Docente from '../models/docente.model.js';
import Usuario from '../models/usuario.model.js';

export const listarDocentes = async (req, res) => {
  try {
    const docentes = await Docente.findAll({
      include: [
        { model: Usuario, attributes: ['email', 'rol', 'activo'] }
      ]
    });
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerDocente = async (req, res) => {
  try {
    const docente = await Docente.findByPk(req.params.id, {
      include: [
        { model: Usuario, attributes: ['email', 'rol', 'activo'] },
        { 
          association: 'Materias',
          attributes: ['nombre', 'descripcion']
        }
      ]
    });

    if (!docente) {
      return res.status(404).json({ error: 'Docente no encontrado' });
    }

    res.json(docente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearDocente = async (req, res) => {
  try {
    const { usuario_id, ...datosDocente } = req.body;
    const docente = await Docente.create({
      ...datosDocente,
      usuario_id
    });
    res.status(201).json(docente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const actualizarDocente = async (req, res) => {
  try {
    const [updated] = await Docente.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Docente no encontrado' });
    }

    const docenteActualizado = await Docente.findByPk(req.params.id);
    res.json(docenteActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarDocente = async (req, res) => {
  try {
    const deleted = await Docente.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Docente no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};