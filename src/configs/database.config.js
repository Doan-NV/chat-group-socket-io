require('dotenv').config();

const db = {
  connect: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER_DATABASE,
  password: process.env.DB_PASSWORD,
  db_auth: process.env.DB_USER_DATABASE_AUTH,
  db_replica: process.env.DB_REPLICA_SET,
  directConnection: process.env.DB_DIRECT_CONNECTION,
};
const options = {
  useUnifiedTopology: true,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
};

module.exports = { db, options };
