import express from 'express';
import fetch from 'node-fetch';
import { getMongoConnection } from '../helpers/mongoConnection';

const FishFinderController = express.Router();

FishFinderController.get('/all-profiles', async (req, res) => {
  console.log('/all-profiles endpoint reached.');

  const db = getMongoConnection();

  db.collection('species').find().sort({"Species Name": 1}).toArray((err, items) => {
    // res.end(JSON.stringify(items));
    res.end(JSON.stringify(items, null, 4));
  })
}); 


FishFinderController.get('/wild-profiles', async (req, res) => {
  console.log('/wild-profiles endpoint reached.');

  const db = getMongoConnection();

  db.collection('species').find({"Harvest Type":"Wild"}).sort({"Species Name": 1}).toArray((err, items) => {
    // res.end(JSON.stringify(items));
    res.end(JSON.stringify(items, null, 4));
  })
});


FishFinderController.get('/farmed-profiles', async (req, res) => {
  console.log('/farmed-profiles endpoint reached.');
  
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