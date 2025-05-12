import { Router } from 'express';
import { 
  generarBoletin,
  obtenerPromedioAlumno
} from '../controllers/boletines.controller.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/alumno/:alumnoId', generarBoletin);
router.get('/promedio/:alumnoId', obtenerPromedioAlumno);

export default router;