const mongoose = require('mongoose');
const { databaseConfig } = require('../configs');

const { db, options } = databaseConfig;

const auth = db.user && db.password ? `${db.user}:${db.password}@` : '';

/**
 * Connect mongoose DB.
 */
const hosts = db.host.split(',');
const urlHost = hosts.map((host) => `${host}:${db.port}`).join(',');
let urlConnect = `mongodb://${auth}${urlHost}/${db.database}`;

if (db.db_replica) {
  urlConnect += `?replicaSet=${db.db_replica}`;
  if (db.db_auth) {
    urlConnect += `&authSource=${db.db_auth}`;
  }
} else {
  if (db.db_auth) {
    urlConnect += `?authSource=${db.db_auth}`;
  }
}

const connectDB = () => {
  mongoose.connection.on('connecting', () => {
    console.log('connecting to MongoDB...');
  });

  console.log('Connecting to MongoDB:', urlConnect);
  mongoose.connect(`${urlConnect}`, options);

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });
};

module.exports = connectDB;
