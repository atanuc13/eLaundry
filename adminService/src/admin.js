const express = require("express");
const bodyparser = require("body-parser");
const admin = require('./routes/Admin');
require('dotenv/config');
var cors = require('cors');
var mongoose = require('mongoose');
const app = express();


//Middlewar
// app.use(cors({
//     origin: ['http://10.50.5.96:4200/']
// }));
app.use(cors({ origin: false }))
app.use(bodyparser.json());

// Route
app.use('/admin', admin);

// run server inn port no. 3000
const port = process.env.PORT || 3000;
app.listen(port);

//database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("Connected to port", port);


});