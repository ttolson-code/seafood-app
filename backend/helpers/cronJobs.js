import cron from 'node-cron';
import runCron from './fetchSpeciesData';

// Run cron job every 12 hours. 
cron.schedule(`0 */12 * * *`, () => {
  console.log(`Running Cron Job.`);
  runCron();
});