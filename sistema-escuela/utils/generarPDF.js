import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generarBoletinPDF = (alumno, notas, outputPath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);
    
    doc.pipe(stream);

    // Encabezado
    doc.fontSize(20).text('Boletín de Calificaciones', { align: 'center' });
    doc.moveDown();
    
    // Información del alumno
    doc.fontSize(14).text(`Alumno: ${alumno.nombre} ${alumno.apellido}`);
    doc.text(`Curso: ${alumno.Curso.nombre}`);
    doc.text(`Año Lectivo: ${alumno.Curso.año_lectivo}`);
    doc.moveDown();

    // Tabla de notas
    doc.fontSize(12).text('Materia', 50, doc.y, { width: 200, align: 'left' });
    doc.text('Tipo', 250, doc.y, { width: 100, align: 'left' });
    doc.text('Calificación', 350, doc.y, { width: 100, align: 'right' });
    doc.moveDown();

    // Línea separadora
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    // Datos de notas
    notas.forEach(nota => {
      doc.text(nota.Materia.nombre, 50, doc.y, { width: 200, align: 'left' });
      doc.text(nota.tipo_evaluacion, 250, doc.y, { width: 100, align: 'left' });
      doc.text(nota.calificacion.toString(), 350, doc.y, { width: 100, align: 'right' });
      doc.moveDown();
    });

    doc.end();

    stream.on('finish', () => resolve(outputPath));
    stream.on('error', reject);
  });
};