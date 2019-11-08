const mongoosedb = require('mongoose');
const { dbCredentials } = require('./config.json');

class Database {

  static connect() {
    mongoosedb.Promise = global.Promise;
    mongoosedb.connect(dbCredentials, { useMongoClient: true });
  }
}

module.exports = Database;