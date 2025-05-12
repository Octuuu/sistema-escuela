import Alumno from '../models/alumno.model.js';
import Docente from '../models/docente.model.js';
import Curso from '../models/curso.model.js';
import Materia from '../models/materia.model.js';
import Nota from '../models/nota.model.js';
import Asistencia from '../models/asistencia.model.js';

export const estadisticasGenerales = async (req, res) => {
  try {
    const [totalAlumnos, totalDocentes, totalCursos, totalMaterias] = await Promise.all([
      Alumno.count(),
      Docente.count(),
      Curso.count(),
      Materia.count()
    ]);

    res.json({
      totalAlumnos,
      totalDocentes,
      totalCursos,
      totalMaterias
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const topMejoresAlumnos = async (req, res) => {
  try {
    const mejoresAlumnos = await Nota.findAll({
      attributes: [
        'alumno_id',
        [sequelize.fn('AVG', sequelize.col('calificacion')), 'promedio']
      ],
      group: ['alumno_id'],
      order: [[sequelize.fn('AVG', sequelize.col('calificacion')), 'DESC']],
      limit: 5,
      include: [
        { model: Alumno, attributes: ['nombre', 'apellido'] }
      ]
    });

    res.json(mejoresAlumnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const asistenciaPorCurso = async (req, res) => {
  try {
    const { cursoId } = req.params;
    const curso = await Curso.findByPk(cursoId, {
      include: [
        {
          model: Alumno,
          include: [
            {
              model: Asistencia,
              where: {
                fecha: {
                  [sequelize.Op.between]: [
                    new Date(new Date().setDate(new Date().getDate() - 30)),
                    new Date()
                  ]
                }
              },
              required: false
            }
          ]
        }
      ]
    });

    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    const estadisticas = curso.Alumnos.map(alumno => {
      const totalAsistencias = alumno.Asistencias.length;
      const presentes = alumno.Asistencias.filter(a => a.estado === 'presente').length;
      const porcentaje = totalAsistencias > 0 ? (presentes / totalAsistencias) * 100 : 0;

      return {
        alumno: `${alumno.nombre} ${alumno.apellido}`,
        totalAsistencias,
        presentes,
        porcentaje: porcentaje.toFixed(2)
      };
    });

    res.json(estadisticas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};