import { Router } from 'express';
import { 
  listarAsistencias, 
  obtenerAsistencia, 
  crearAsistencia, 
  actualizarAsistencia, 
  eliminarAsistencia,
  asistenciasPorAlumno,
  registrarAsistenciasMasivas
} from '../controllers/asistencias.controller.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';
import { ROLES } from '../config/roles.js';

const router = Router();

router.use(authenticate);

router.get('/', listarAsistencias);
router.get('/:id', obtenerAsistencia);
router.post('/', requireRole([ROLES.ADMIN, ROLES.DOCENTE]), crearAsistencia);
router.put('/:id', requireRole([ROLES.ADMIN, ROLES.DOCENTE]), actualizarAsistencia);
router.delete('/:id', requireRole([ROLES.ADMIN, ROLES.DOCENTE]), eliminarAsistencia);

// Rutas adicionales
router.get('/alumno/:alumnoId', asistenciasPorAlumno);
router.post('/masivas', requireRole([ROLES.ADMIN, ROLES.DOCENTE]), registrarAsistenciasMasivas);

export default router;