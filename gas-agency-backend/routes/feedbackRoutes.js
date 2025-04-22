import express from 'express';
import { submitFeedback, getAllFeedback, updateFeedback, deleteFeedback } from '../controllers/feedbackController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitFeedback, protect, adminOnly);
router.get('/', getAllFeedback, protect, adminOnly); 
router.get('/', getAllFeedback, protect, adminOnly);
router.put('/:id', updateFeedback, protect, adminOnly); 
router.delete('/:id', deleteFeedback);


export default router;