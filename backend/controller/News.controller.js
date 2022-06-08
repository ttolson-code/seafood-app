import express from 'express';
import fetch from 'node-fetch';
import { getMongoConnection } from '../helpers/mongoConnection.js';

const NewsController = express.Router();

NewsController.get('/all', async (req, res) => {
  console.log('/all endpoint reached.');

  const db = getMongoConnection();

  db.collection('news').find().sort({"date": -1}).toArray((err, items) => {
    // res.end(JSON.stringify(items));
    res.end(JSON.stringify(items, null, 4));
  })
}); 

export default NewsController;