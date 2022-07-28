import express from 'express';
import { getNews } from '../controllers/newsController.js';

// Create express router
const router = express.Router();

// GET all news data.
router.get('/all', getNews); 

export default router;