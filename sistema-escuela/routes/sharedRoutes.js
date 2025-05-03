import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/me', (req, res) => {
  res.json({ user: req.user });
});

export default router;
