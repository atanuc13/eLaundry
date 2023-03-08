const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const cors = require('cors');
require('dotenv/config');
//middlewares
app.use(cors());
app.use(bodyParser.json()) //convert the incoming request in json format(table entry S)
//import routes
const postsRoute = require('./routes/post');
app.use('/posts',postsRoute); //every time when u got post then use postroutes.


 
// ROUTES
app.get('/',(req,res)=> {
    res.send('We are on Home');
} );
app.get('/posts',(req,res)=>{
    res.send('we are on post');
})
//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
{useNewUrlParser:true},
()=> console.log('connected to DB1!')
);
const port = process.env.port || 4004;
//How to we start listening to the server
app.listen(port);