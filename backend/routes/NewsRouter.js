import express from 'express';
import { getMongoConnection } from '../helpers/mongoConnection.js';

const router = express.Router();

// GET all news data.
router.get('/all', async (req, res) => {
  const db = getMongoConnection();

  db.collection('news').find().sort({"date": -1}).toArray((err, items) => {
    res.end(JSON.stringify(items, null, 4));
  })
}); 

export default router;