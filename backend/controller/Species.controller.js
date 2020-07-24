import express from 'express';
import fetch from 'node-fetch';
import { mongoGet } from '../helpers/mongoConnection';

const SpeciesController = express.Router();

SpeciesController.get('/all', async (req, res) => {
  console.log('Species /all endpoint reached.');
  const db = mongoGet();

  db.collection('species').find().sort({"Species Name": 1}).toArray((err, items) => {
    res.end(JSON.stringify(items));
  })
}); 

SpeciesController.get('/wild', async (req, res) => {
  console.log('Species /wild endpoint reached.');
  const db = mongoGet();

  db.collection('species').find({"Harvest Type":"Wild"}).sort({"Species Name": 1}).toArray((err, items) => {
    res.end(JSON.stringify(items));
  })
});

SpeciesController.get('/farmed', async (req, res) => {
  console.log('Species /farmed endpoint reached.');
  const db = mongoGet();

  db.collection('species').find({"Harvest Type":"Farmed"}).sort({"Species Name": 1}).toArray((err, items) => {
    res.end(JSON.stringify(items));
  })
});

SpeciesController.get('/:id', async (req, res) => {
  const db = mongoGet();

  console.log(req.params.id);
  
  db.collection('species').find({ "Species Name" : req.params.id }).toArray((err, items) => {
    res.end(JSON.stringify(items));
  })
});

export default SpeciesController;




// const url = "https://www.fishwatch.gov/api/species";
// const response = await fetch(url);
// const responseJson = await response.json();

// if (responseJson.error) {
//   res.end(JSON.stringify({ error: responseJson.error.message }));
// } else {
//   res.end(JSON.stringify(responseJson));
// }


// SpeciesController.get('/:id', async (req, res) => {
//   const db = mongoGet();

//   console.log(req.params.id);
  
//   db.collection('species').find({ "Species Name" : req.params.id }).toArray((err, items) => {
//     res.end(JSON.stringify(items));
//   })
// });