import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

// Registro (solo para pruebas o admin futuro)
router.post('/register', register);

// Inicio de sesión
router.post('/login', login);

export default router;
