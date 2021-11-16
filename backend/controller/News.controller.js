import express from 'express';
import fetch from 'node-fetch';
import { getMongoConnection } from '../helpers/mongoConnection';

const NewsController = express.Router();

NewsController.get('/all-news', async (req, res) => {
  console.log('/all-news endpoint reached.');

  const db = getMongoConnection();

  db.collection('news').find().toArray((err, items) => {
    // res.end(JSON.stringify(items));
    res.end(JSON.stringify(items, null, 4));
  })
}); 

export default NewsController;