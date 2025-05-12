import app from './app.js';
import { syncModels } from './models/dbInit.js';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();

const port = process.env.PORT || 3000;

// Crear directorios necesarios si no existen
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDirectoryExists(path.join(__dirname, process.env.UPLOADS_FOLDER));
ensureDirectoryExists(path.join(__dirname, 'temp'));

// Sincronizar modelos y luego iniciar servidor
syncModels().then(() => {
  const server = createServer(app);
  
  server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Error al iniciar el servidor:', error);
  process.exit(1);
});