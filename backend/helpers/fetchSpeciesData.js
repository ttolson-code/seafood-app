import fetch from 'node-fetch';
import { MongoClient } from 'mongodb';
import { mongoGet } from './mongoConnection';

// Use node-fetch to fetch data from FishWatch.gov api.
async function fetchSpeciesData() {
  console.log("Fetching Data from fishwatch.gov.")
  const url = "https://www.fishwatch.gov/api/species";
  const response = await fetch(url);
  const responseJson = await response.json();

  if (responseJson.error) {
    res.end(JSON.stringify({ error: responseJson.error.message }));
  } else {
    return responseJson; 
  }
}

export default async function runCron() {
  const [ speciesData ] = await Promise.all([ fetchSpeciesData() ]);
  const db = mongoGet();
  
  // Drop species collection in order to reseed with fresh data.
  console.log('Dropping species collection.')
  db.collection('species').drop();

  // Take speciesData array and insert individual species objects into mongoDB as documents.
  speciesData.map(species => {
    console.log("Reseeding species collection.");
    db.collection('species').insertOne(species);
  });
  console.log('Cron Job complete.')
}



// Create mongoDB connection.
// const mongoURL = 'mongodb://localhost:27017';
// const dbName = 'fish-finder';
// const mongoClient = new MongoClient(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true });

// IIFE async function to establish connection.
// (async function() {
//   try {
//     // await mongoClient.connect();
//     // console.log("Connected successfully to MongoDB server.");

//     // const db = mongoClient.db(dbName);
//     // const collection = db.collection('species');
//     // Take speciesData array and insert individual species objects into mongoDB as documents.
//     speciesData.map(species => {
//       console.log("Inserting Document.");
//       collection.insertOne(species);
//     });
//   } catch (err) {
//     console.log(err.stack);
//   }
//   console.log("Cron Job Complete.");
  // })();