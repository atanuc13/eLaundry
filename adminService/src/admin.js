const express = require("express");
const bodyparser= require("body-parser");
const admin=require('./routes/Admin');
require('dotenv/config');
var cors = require('cors');
var mongoose = require('mongoose');
const app =express();


//Middleware
app.use(cors());
app.use(bodyparser.json());

// Route
app.use('/admin',admin);
 
// run server inn port no. 3000
app.listen( process.env.PORT||3000);

//database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true},function(err, db) {
     if (err) throw err;
     console.log("Connected");
   
   });


