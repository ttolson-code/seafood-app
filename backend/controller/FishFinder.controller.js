import express from 'express';
import fetch from 'node-fetch';
import { getMongoConnection } from '../helpers/mongoConnection.js';

const FishFinderController = express.Router();

FishFinderController.get('/profiles/all', async (req, res) => {
  console.log('/profiles/all endpoint reached.');

  const db = await getMongoConnection();

  await db.collection('species').find().sort({"Species Name": 1}).toArray((err, items) => {
    res.end(JSON.stringify(items, null, 4));
  })
}); 


FishFinderController.get('/profiles/wild', async (req, res) => {
  console.log('/profiles/wild endpoint reached.');

  const db = await getMongoConnection();

  db.collection('species').find({"Harvest Type":"Wild"}).sort({"Species Name": 1}).toArray((err, items) => {
    res.end(JSON.stringify(items, null, 4));
  })
});


FishFinderController.get('/profiles/farmed', async (req, res) => {
  console.log('/profiles/farmed endpoint reached.');
  
  const db = await getMongoConnection();

  await db.collection('species').find({"Harvest Type":"Farmed"}).sort({"Species Name": 1}).toArray((err, items) => {
    res.end(JSON.stringify(items, null, 4));
  })
});


FishFinderController.get('/species/:id', async (req, res) => {
  console.log(`/species/${req.params.id} endpoint reached.`)

  const db = await getMongoConnection();

  const speciesData = await db.collection('species').findOne({ "Path" : new RegExp(req.params.id) })
    
  res.end(JSON.stringify(speciesData, null, 4));
});


export default FishFinderController;