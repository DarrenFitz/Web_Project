// ====  Import Node Modules ===
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');
const cors = require('cors');

// ====  Database Connection ===
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, { useMongoClient: true }, (err) => {
  if (err) {
    console.log('Could NoT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

// ====  Middleware ===
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());// parse application/json
app.use(express.static(__dirname + '/client/dist/')); //static directory for frontend
app.use('/authentication', authentication);

//// ====  Connect server to Angular 2 Index.html ===
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

//Start server Listen on port 8080
app.listen(8080, () => {
  console.log('Listening on port 8080');
});
