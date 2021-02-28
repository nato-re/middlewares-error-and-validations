const { MongoClient } = require('mongodb');

const MONGODB_URL = 'mongodb://127.0.0.1:27017';
const DATABASE = 'Persona';

let conn;

const connection = async () => {
  return conn ? conn : MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((conn) => conn.db(DATABASE))
  .catch((err) => {
    process.exit();
  });
}

module.exports = connection;