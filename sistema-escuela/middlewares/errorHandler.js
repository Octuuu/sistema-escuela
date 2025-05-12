export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
  
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El registro ya existe' });
    }
  
    res.status(500).json({ error: 'Error interno del servidor' });
};