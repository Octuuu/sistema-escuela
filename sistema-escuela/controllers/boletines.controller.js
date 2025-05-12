import Alumno from '../models/alumno.model.js';
import Nota from '../models/nota.model.js';
import Curso from '../models/curso.model.js';
import { generarBoletinPDF } from '../utils/generarPDF.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generarBoletin = async (req, res) => {
  try {
    const alumno = await Alumno.findByPk(req.params.alumnoId, {
      include: [
        { model: Curso },
        {
          model: Nota,
          include: [{ model: Materia }]
        }
      ]
    });

    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    const outputPath = path.join(__dirname, '../temp', `boletin_${alumno.id}.pdf`);
    
    // Crear directorio temp si no existe
    if (!fs.existsSync(path.join(__dirname, '../temp'))) {
      fs.mkdirSync(path.join(__dirname, '../temp'));
    }

    await generarBoletinPDF(alumno, alumno.Notas, outputPath);

    res.download(outputPath, `boletin_${alumno.nombre}_${alumno.apellido}.pdf`, (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
      }
      // Eliminar el archivo temporal después de enviarlo
      fs.unlinkSync(outputPath);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPromedioAlumno = async (req, res) => {
  try {
    const notas = await Nota.findAll({
      where: { alumno_id: req.params.alumnoId }
    });

    if (notas.length === 0) {
      return res.json({ promedio: null, message: 'El alumno no tiene notas registradas' });
    }

    const suma = notas.reduce((total, nota) => total + parseFloat(nota.calificacion), 0);
    const promedio = suma / notas.length;

    res.json({ promedio: promedio.toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};