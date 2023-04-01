const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const UserRoute = require('./src/routes/user')
const AuthRoute = require('./src/routes/auth')

const dotenv = require('dotenv')
dotenv.config()
mongoose.connect('mongodb://127.0.0.1/eLaundary');

const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('DataBase Connection Established')
})

const app = express()
mongoose.set('strictQuery', false);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

app.use('/api/user', UserRoute)
app.use('/api', AuthRoute)