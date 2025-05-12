import { Router } from 'express';
import { 
  listarMaterias, 
  obtenerMateria, 
  crearMateria, 
  actualizarMateria, 
  eliminarMateria 
} from '../controllers/materias.controller.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';
import { ROLES } from '../config/roles.js';

const router = Router();

router.use(authenticate);

router.get('/', listarMaterias);
router.get('/:id', obtenerMateria);
router.post('/', requireRole([ROLES.ADMIN]), crearMateria);
router.put('/:id', requireRole([ROLES.ADMIN]), actualizarMateria);
router.delete('/:id', requireRole([ROLES.ADMIN]), eliminarMateria);

export default router;