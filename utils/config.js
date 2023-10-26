require('dotenv').config();

const {
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
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
