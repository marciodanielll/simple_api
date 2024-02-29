const { MongoClient } = require("mongodb");
require("dotenv").config();

let _client;
let _database;

const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  if (!_client) {
    _client = new MongoClient(uri);
    try {
      await _client.connect();
      _database = _client.db(process.env.DB_NAME);
      console.log("Connect to MongoDB with success");
    } catch (error) {
      console.error("Error to connect", error.message);
      throw error;
    }
  }
  return { client: _client, database: _database };
}

function getDatabase() {
  if (!_database) {
    throw new Error("Call connectToDatabase first");
  }
  return _database;
}

module.exports = { connectToDatabase, getDatabase };
