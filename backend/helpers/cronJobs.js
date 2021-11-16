import cron from 'node-cron';
import updateSpeciesTable from './fetchSpeciesData';
import updateNewsTable from './fetchNewsData';

// Run cron job every 12 hours. (“At minute 0 past every 12th hour.”)
cron.schedule(`0 */12 * * *`, () => {
  console.log(`Running Cron Job.`);
  updateSpeciesTable();
  updateNewsTable();
});