const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToDatabase, getDatabase } = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/messages", async (req, res) => {
  const { message } = req.body;

  await connectToDatabase();
  const database = getDatabase();
  const messages = database.collection(process.env.COLLECTION_NAME);

  await messages.insertOne({ message });

  return res.status(201).send();
});

app.get("/", (req, res) => {
  return res.send("Api running...");
});

module.exports = app;
