const express = require("express");
const bodyparser = require("body-parser");
const feedBack = require('./routes/feedBack');
require('dotenv/config');
var cors = require('cors');
var mongoose = require('mongoose');
const app = express();


//Middleware
app.use(cors());
app.use(bodyparser.json());

// Route
app.use('/feedback', feedBack);

// run server inn port no. 3000
const port = process.env.PORT || 3000
app.listen(port);

//database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("Connected");

});
console.log(`running on port ${port}`)