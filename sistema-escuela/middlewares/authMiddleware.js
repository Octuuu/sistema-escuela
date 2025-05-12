import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Usuario from '../models/usuario.model.js';

dotenv.config();

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findByPk(decoded.id);

    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};