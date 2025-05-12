import { Router } from 'express';
import { 
  listarCursos, 
  obtenerCurso, 
  crearCurso, 
  actualizarCurso, 
  eliminarCurso,
  agregarMateriaACurso,
  quitarMateriaDeCurso
} from '../controllers/cursos.controller.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';
import { ROLES } from '../config/roles.js';

const router = Router();

router.use(authenticate);

router.get('/', listarCursos);
router.get('/:id', obtenerCurso);
router.post('/', requireRole([ROLES.ADMIN]), crearCurso);
router.put('/:id', requireRole([ROLES.ADMIN]), actualizarCurso);
router.delete('/:id', requireRole([ROLES.ADMIN]), eliminarCurso);

// Rutas para manejar materias en cursos
router.post('/:cursoId/materias/:materiaId', requireRole([ROLES.ADMIN]), agregarMateriaACurso);
router.delete('/:cursoId/materias/:materiaId', requireRole([ROLES.ADMIN]), quitarMateriaDeCurso);

export default router;