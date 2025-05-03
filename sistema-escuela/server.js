import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import sharedRoutes from './routes/sharedRoutes.js';
import sequelize from './config/database.js';

// Modelos (importar para que Sequelize los registre)
import './models/User.js';
import './models/Student.js';
import './models/Teacher.js';
import './models/Course.js';
import './models/Attendance.js';
import './models/Grade.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/shared', sharedRoutes);

// Inicialización del servidor y DB
(async () => {
  try {
    await sequelize.sync(); // { force: true } si querés reiniciar tablas
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
})();
