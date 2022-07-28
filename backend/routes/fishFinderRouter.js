import express from 'express';

import { 
  getAllSpecies, 
  getWildSpecies, 
  getFarmedSpecies,
  getSpecies
} from '../controllers/fishFinderController.js'; 

// Create express router
const router = express.Router();

// GET 'all' species
router.get('/species/all', getAllSpecies); 

// GET 'wild' species
router.get('/species/wild', getWildSpecies);

// GET 'farmed' species
router.get('/species/farmed', getFarmedSpecies);

// GET 'single' species
router.get('/species/:id', getSpecies);

export default router;