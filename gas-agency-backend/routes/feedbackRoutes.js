import express from 'express';
import { submitFeedback, getAllFeedback, updateFeedback } from '../controllers/feedbackController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/feedback', submitFeedback, protect, adminOnly);
router.get('/', getAllFeedback, protect, adminOnly); 
router.get('/admin/feedbacks', getAllFeedback, protect, adminOnly);
router.put('/admin/feedbacks/:id', updateFeedback, protect, adminOnly); 


export default router;