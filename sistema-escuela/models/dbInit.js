import sequelize from '../config/db.js';
import Alumno from './alumno.model.js';
import Docente from './docente.model.js';
import Materia from './materia.model.js';
import Curso from './curso.model.js';
import Nota from './nota.model.js';
import Asistencia from './asistencia.model.js';
import Usuario from './usuario.model.js';

// Relaciones entre modelos
const setupRelations = () => {
  // Relación Docente-Materia (un docente puede tener muchas materias)
  Docente.hasMany(Materia, { foreignKey: 'docente_id' });
  Materia.belongsTo(Docente, { foreignKey: 'docente_id' });

  // Relación Curso-Alumno (un curso tiene muchos alumnos)
  Curso.hasMany(Alumno, { foreignKey: 'curso_id' });
  Alumno.belongsTo(Curso, { foreignKey: 'curso_id' });

  // Relación Materia-Curso (una materia puede estar en muchos cursos)
  Materia.belongsToMany(Curso, { through: 'materia_curso', foreignKey: 'materia_id' });
  Curso.belongsToMany(Materia, { through: 'materia_curso', foreignKey: 'curso_id' });

  // Relación Alumno-Nota (un alumno tiene muchas notas)
  Alumno.hasMany(Nota, { foreignKey: 'alumno_id' });
  Nota.belongsTo(Alumno, { foreignKey: 'alumno_id' });

  // Relación Materia-Nota (una materia tiene muchas notas)
  Materia.hasMany(Nota, { foreignKey: 'materia_id' });
  Nota.belongsTo(Materia, { foreignKey: 'materia_id' });

  // Relación Alumno-Asistencia (un alumno tiene muchas asistencias)
  Alumno.hasMany(Asistencia, { foreignKey: 'alumno_id' });
  Asistencia.belongsTo(Alumno, { foreignKey: 'alumno_id' });

  // Relación Usuario-Alumno/Docente (un usuario puede ser alumno o docente)
  Usuario.hasOne(Alumno, { foreignKey: 'usuario_id' });
  Alumno.belongsTo(Usuario, { foreignKey: 'usuario_id' });

  Usuario.hasOne(Docente, { foreignKey: 'usuario_id' });
  Docente.belongsTo(Usuario, { foreignKey: 'usuario_id' });
};

export const syncModels = async () => {
  try {
    setupRelations();
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados correctamente');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
};