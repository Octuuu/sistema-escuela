import { Router } from 'express';
import { 
  listarAlumnos, 
  obtenerAlumno, 
  crearAlumno, 
  actualizarAlumno, 
  eliminarAlumno 
} from '../controllers/alumnos.controller.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';
import { ROLES } from '../config/roles.js';

const router = Router();

router.use(authenticate);

router.get('/', listarAlumnos);
router.get('/:id', obtenerAlumno);
router.post('/', requireRole([ROLES.ADMIN]), crearAlumno);
router.put('/:id', requireRole([ROLES.ADMIN]), actualizarAlumno);
router.delete('/:id', requireRole([ROLES.ADMIN]), eliminarAlumno);

export default router;