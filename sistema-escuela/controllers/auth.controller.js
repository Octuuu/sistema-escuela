import Usuario from '../models/usuario.model.js';
import { generarToken } from '../utils/generarToken.js';
import { ROLES } from '../config/roles.js';

export const registrar = async (req, res) => {
  const { email, password, rol } = req.body;

  try {
    if (!ROLES.ALL.includes(rol)) {
      return res.status(400).json({ error: 'Rol no válido' });
    }

    const usuario = await Usuario.create({ email, password, rol });
    const token = generarToken(usuario.id, usuario.rol);

    res.status(201).json({ usuario, token });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !(await usuario.validarPassword(password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generarToken(usuario.id, usuario.rol);
    res.json({ usuario, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};