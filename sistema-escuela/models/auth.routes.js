import { Router } from 'express';
import { registrar, login, perfil } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/perfil', authenticate, perfil);

export default router;