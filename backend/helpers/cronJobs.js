import cron from 'node-cron';
import runCron from './fetchSpeciesData';

// Run cron job every 10 minutes. 
cron.schedule(`*/10 * * * *`, () => {
  console.log(`Running Cron Job.`);
  runCron();
});