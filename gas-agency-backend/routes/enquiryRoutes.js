import express from 'express';
import { createEnquiry, getEnquiries } from '../controllers/enquiryController.js';

const router = express.Router();

router.post('/', createEnquiry);    // POST /api/enquiries
router.get('/', getEnquiries);      // GET /api/enquiries

export default router;