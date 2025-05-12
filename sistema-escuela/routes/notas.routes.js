import { Router } from 'express';
import { 
  listarNotas, 
  obtenerNota, 
  crearNota, 
  actualizarNota, 
  eliminarNota,
  notasPorAlumno,
  notasPorMateria
} from '../controllers/notas.controller.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';
import { ROLES } from '../config/roles.js';

const router = Router();

router.use(authenticate);

router.get('/', listarNotas);
router.get('/:id', obtenerNota);
router.post('/', requireRole([ROLES.ADMIN, ROLES.DOCENTE]), crearNota);
router.put('/:id', requireRole([ROLES.ADMIN, ROLES.DOCENTE]), actualizarNota);
router.delete('/:id', requireRole([ROLES.ADMIN, ROLES.DOCENTE]), eliminarNota);

// Rutas adicionales
router.get('/alumno/:alumnoId', notasPorAlumno);
router.get('/materia/:materiaId', notasPorMateria);

export default router;