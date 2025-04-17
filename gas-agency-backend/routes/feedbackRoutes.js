import express from 'express';
import { submitFeedback, getAllFeedback, updateFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/feedback', submitFeedback);
router.get('/', getAllFeedback); 
router.get('/admin/feedbacks', getAllFeedback);
router.put('/admin/feedbacks/:id', updateFeedback); 


export default router;