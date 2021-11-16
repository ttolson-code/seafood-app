import express from 'express';
import esm from 'esm';
import cors from 'cors';
import config from './config';

// Imports api controllers.
import { IndexController, FishFinderController, NewsController } from './controller';

// Imports mongoConnection function to establish database connection.
import { mongoConnect } from './helpers/mongoConnection';

// Imports updateSpeciesTable() function to update database on app startup.
import updateSpeciesTable from './helpers/fetchSpeciesData';
import updateNewsTable from './helpers/fetchNewsData';

// Import a module for side effects only.
// This runs the module's global code, but doesn't actually import any values.
import './helpers/cronJobs';
import './helpers/fetchNewsData';

// Assign variables from config.js.
const { express: { baseURL, host, port } } = config;

//  Create express server.
const app = express();

// Use cors.
app.use(cors());

// Controllers(APIs).
app.use('/', IndexController);
app.use('/fish-finder', FishFinderController);
app.use('/news', NewsController);

// Connect to MongoDb and then start express server.
mongoConnect()
  .then(() => console.log('Connected to MongoDB.'))
  .then(() => updateSpeciesTable())
  .then(() => updateNewsTable())
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

