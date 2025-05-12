import { Router } from 'express';
import { 
  estadisticasGenerales,
  topMejoresAlumnos,
  asistenciaPorCurso
} from '../controllers/dashboard.controller.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';
import { ROLES } from '../config/roles.js';

const router = Router();

router.use(authenticate);

router.get('/estadisticas', estadisticasGenerales);
router.get('/mejores-alumnos', topMejoresAlumnos);
router.get('/asistencia-curso/:cursoId', requireRole([ROLES.ADMIN, ROLES.DOCENTE]), asistenciaPorCurso);

export default router;