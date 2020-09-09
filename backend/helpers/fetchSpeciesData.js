import fetch from 'node-fetch';
import { MongoClient } from 'mongodb';
import { getMongoConnection } from './mongoConnection';

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

export default async function updateDatabase() {
  const speciesData = await fetchSpeciesData();
  const db = getMongoConnection();
  
  // Drop species collection in order to reseed with fresh data.
  if (await db.collection('species').find().count() > 0) {
    console.log('Dropping species collection.');
    db.collection('species').drop();
  }

  // Take speciesData array and insert individual species objects into mongoDB as documents.
  speciesData.map(species => {
    console.log("Reseeding species collection.");
    db.collection('species').insertOne(species);
  });
  console.log('Cron Job complete.')
}
