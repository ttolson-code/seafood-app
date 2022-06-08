import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import config from './config.js';

// Imports api controllers.
import { IndexController, FishFinderController, NewsController } from './controller/index.js';

// Imports mongoConnection function to establish database connection.
import { mongoConnect } from './helpers/mongoConnection.js';

// Imports updateSpeciesTable() and updateNewsTable() function to reseed database on app startup.
import updateSpeciesTable from './helpers/fetchSpeciesData.js';
import updateNewsTable from './helpers/fetchNewsData.js';

// Import a module for side effects only. This runs the module's global code, but doesn't actually import any values.
import './helpers/cronJobs.js';

// Assign variables from config.js.
const { express: { baseURL, host, port } } = config;

//  Create express server.
const app = express();

// Use cors.
app.use(cors());

// Controllers (APIs).
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
    // Hard exit on a database connection error.
    process.exit(1);
  });

