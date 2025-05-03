import express from 'express';
import { getProfile } from '../controllers/teacherController.js';
import { markAttendance } from '../controllers/attendanceController.js';
import { addGrade } from '../controllers/gradeController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Solo profesores autenticados
router.use(authenticate);
router.use(authorize('teacher'));

router.get('/profile', getProfile);
router.post('/attendance', markAttendance);
router.post('/grade', addGrade);

export default router;
