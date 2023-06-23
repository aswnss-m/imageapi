const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

const imageRouter = require('./image');

app.use(cors());
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Mongoose connection established");
}); 

app.use('/image', imageRouter);

app.get('/', (req, res) => {
  res.send('Please visit www.cultaway.in');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
