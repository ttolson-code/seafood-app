import express from 'express';
import esm from 'esm';
import cors from 'cors';
import config from './config';
import { IndexController, SpeciesController } from './controller';
import { mongoConnect } from './helpers/mongoConnection';
import './helpers/cronJobs';

// Assign variables from config.js.
const { express: { baseURL, host, port } } = config;

//  Create express server.
const app = express();

// Use cors.
app.use(cors());

// Controllers(APIs).
app.use('/', IndexController);
app.use('/species', SpeciesController);

// Connect to MongoDb and then start express server.
mongoConnect()
  .then(() => console.log('Connected to MongoDB.'))
  .then(() => {
    app.listen(port, () => {
      console.log(`Express server is running on port ${baseURL}${host}\/${port}.`);
    });
  })
  .catch((err) => {
    console.error(err);
    // Always hard exit on a database connection error.
    process.exit(1);
  });

