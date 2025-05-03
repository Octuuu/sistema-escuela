import express from 'express';
import { getGrades, getAttendance } from '../controllers/studentController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Solo estudiantes autenticados
router.use(authenticate);
router.use(authorize('student'));

router.get('/grades', getGrades);
router.get('/attendance', getAttendance);

export default router;
