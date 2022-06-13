import express from 'express';
import fetch from 'node-fetch';
import { getMongoConnection } from '../helpers/mongoConnection.js';

const FishFinderController = express.Router();

FishFinderController.get('/profiles/all', async (req, res) => {
  console.log('/profiles/all endpoint reached.');

  const db = getMongoConnection();

  db.collection('species').find().sort({"Species Name": 1}).toArray((err, items) => {
    // res.end(JSON.stringify(items));
    res.end(JSON.stringify(items, null, 4));
  })
}); 


FishFinderController.get('/profiles/wild', async (req, res) => {
  console.log('/profiles/wild endpoint reached.');

  const db = getMongoConnection();

  db.collection('species').find({"Harvest Type":"Wild"}).sort({"Species Name": 1}).toArray((err, items) => {
    // res.end(JSON.stringify(items));
    res.end(JSON.stringify(items, null, 4));
  })
});


FishFinderController.get('/profiles/farmed', async (req, res) => {
  console.log('/profiles/farmed endpoint reached.');
  
  const db = getMongoConnection();

  db.collection('species').find({"Harvest Type":"Farmed"}).sort({"Species Name": 1}).toArray((err, items) => {
    // res.end(JSON.stringify(items));
    res.end(JSON.stringify(items, null, 4));
  })
});


FishFinderController.get('/species/:id', async (req, res) => {
  
  const db = getMongoConnection();

  console.log(req.params.id);
  
  db.collection('species').find({ "Species Name" : req.params.id }).toArray((err, items) => {
    // res.end(JSON.stringify(items));
    res.end(JSON.stringify(items, null, 4));
  })
});


export default FishFinderController;