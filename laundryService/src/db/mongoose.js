const mongoose = require('mongoose');

mongoose.connect('mongodb://db:27017/eLaundry').catch(err => console.log(err));