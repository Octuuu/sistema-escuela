import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generarToken = (id, rol) => {
  return jwt.sign({ id, rol }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};