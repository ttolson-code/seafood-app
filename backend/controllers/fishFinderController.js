import { getMongoConnection } from "../utils/mongoConnection.js";
import { ObjectId } from 'mongodb';

// GET 'all' species
const getAllSpecies = async (req, res) => {
  const db = await getMongoConnection();

  await db.collection('species').find().sort({"Species Name": 1}).toArray((err, items) => {
    res.end(JSON.stringify(items, null, 4));
  });
}; 

// GET 'wild' species
const getWildSpecies = async (req, res) => {
  const db = await getMongoConnection();

  db.collection('species').find({"Harvest Type":"Wild"}).sort({"Species Name": 1}).toArray((err, items) => {
    res.end(JSON.stringify(items, null, 4));
  })
};

// GET 'farmed' species.
const getFarmedSpecies = async (req, res) => {
  const db = await getMongoConnection();

  await db.collection('species').find({"Harvest Type":"Farmed"}).sort({"Species Name": 1}).toArray((err, items) => {
    res.end(JSON.stringify(items, null, 4));
  })
};

// GET 'single' species
const getSpecies = async (req, res) => {
  const db = await getMongoConnection();

  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Invalid species Id'})
  }

  const speciesData = await db.collection('species').findOne({ _id: ObjectId(id) });

  if (!speciesData) {
    return res.status(404).json({error: 'No species found'})
  }

  res.end(JSON.stringify(speciesData, null, 4));
};

export {
  getAllSpecies,
  getWildSpecies,
  getFarmedSpecies,
  getSpecies
}