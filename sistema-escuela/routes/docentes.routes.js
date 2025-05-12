import { Router } from 'express';
import { 
  listarDocentes, 
  obtenerDocente, 
  crearDocente, 
  actualizarDocente, 
  eliminarDocente 
} from '../controllers/docentes.controller.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';
import { ROLES } from '../config/roles.js';

const router = Router();

router.use(authenticate);

router.get('/', listarDocentes);
router.get('/:id', obtenerDocente);
router.post('/', requireRole([ROLES.ADMIN]), crearDocente);
router.put('/:id', requireRole([ROLES.ADMIN]), actualizarDocente);
router.delete('/:id', requireRole([ROLES.ADMIN]), eliminarDocente);

export default router;