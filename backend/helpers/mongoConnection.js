import { MongoClient } from 'mongodb';
import config from '../config';

// Assign variables from config.js.
const { mongoDb: { mongoUrl, dbName, options } } = config;

let connection;

const mongoConnect = () => new Promise((resolve, reject) => {
  MongoClient.connect(mongoUrl, options, (err, db) => {
    if (err) { reject(err); return; };
    resolve(db);
    connection = db;
  });
});

const getMongoConnection = () => {
  if(!connection) {
    throw new Error('Call connect first!');
  }
  return connection.db(dbName);
}

export { mongoConnect, getMongoConnection };