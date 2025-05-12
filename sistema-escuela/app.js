import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.routes.js';
import alumnosRoutes from './routes/alumnos.routes.js';
import docentesRoutes from './routes/docentes.routes.js';
import materiasRoutes from './routes/materias.routes.js';
import cursosRoutes from './routes/cursos.routes.js';
import notasRoutes from './routes/notas.routes.js';
import asistenciasRoutes from './routes/asistencias.routes.js';
import boletinesRoutes from './routes/boletines.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import multer from 'multer';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Configuración de Multer para manejar uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, process.env.UPLOADS_FOLDER));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar carpeta de uploads como pública
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOADS_FOLDER)));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/alumnos', alumnosRoutes);
app.use('/api/docentes', docentesRoutes);
app.use('/api/materias', materiasRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/notas', notasRoutes);
app.use('/api/asistencias', asistenciasRoutes);
app.use('/api/boletines', boletinesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Ruta para subir archivos (ejemplo)
app.post('/api/upload', upload.single('foto'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }
  res.json({ 
    message: 'Archivo subido correctamente',
    path: `/uploads/${req.file.filename}`
  });
});

// Manejador de errores
app.use(errorHandler);

export default app;