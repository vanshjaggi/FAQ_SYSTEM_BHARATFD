import express from 'express';
import { 
  createFaq, 
  getFaqs, 
  getFaqById, 
  updateFaq, 
  deleteFaq 
} from '../controllers/faqController.js';

const router = express.Router();

// Create a new FAQ
router.post('/', createFaq);

// Get all FAQs with optional language query
router.get('/', getFaqs);

// Get a single FAQ by ID with optional language query
router.get('/:id', getFaqById);

// Update an FAQ by ID
router.put('/:id', updateFaq);

// Delete an FAQ by ID
router.delete('/:id', deleteFaq);

export default router;