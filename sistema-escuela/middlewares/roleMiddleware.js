import { ROLES } from '../config/roles.js';

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ error: 'Acceso prohibido' });
    }
    next();
  };
};