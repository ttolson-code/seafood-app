import express from 'express';
import cors from 'cors';
import config from './config.js';

// Import routers.
import { rootRouter, fishFinderRouter, newsRouter } from './routes/index.js';

// Import mongoConnection function to establish database connection.
import { mongoConnect } from './utils/mongoConnection.js';

// Import updateSpeciesTable() and updateNewsTable() function to reseed database on app startup.
import updateSpeciesTable from './utils/fetchSpeciesData.js';
import updateNewsTable from './utils/fetchNewsData.js';

// Import a module for side effects only. This runs the module's global code, but doesn't actually import any values.
import './utils/cronJobs.js';

// Assign variables from config.js.
const {
  express: { baseURL, host, port },
} = config;

//  Create express server.
const app = express();

// Middlewares:
// Use cors
app.use(cors());

// Log request to terminal
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Routes
app.use('/', rootRouter);
app.use('/fish-finder', fishFinderRouter);
app.use('/news', newsRouter);

// Connect to MongoDb and then start express server.
mongoConnect()
  .then(() => console.log('Connected to MongoDB.'))
  .then(() => updateSpeciesTable())
  .then(() => updateNewsTable())
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Express server is running on port ${baseURL}${host}\/${port}.`
      );
    });
  })
  .catch((err) => {
    console.error(err);
    // Hard exit on a database connection error.
    process.exit(1);
  });
