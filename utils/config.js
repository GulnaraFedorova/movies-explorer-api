require('dotenv').config();

const {
  DB_URL = 'mongodb://localhost:27017/bitfilmsdb',
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  DB_URL,
  PORT,
  NODE_ENV,
  JWT_SECRET,
};
