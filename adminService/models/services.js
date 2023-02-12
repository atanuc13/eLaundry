var mongoose = require('mongoose');
 
var services = new mongoose.Schema({
   
    name: {
        type:String,
        required:true
    },
    imgPath: {
        type:String,
        required:true
    },
});

//Image is a model which has a schema imageSchema


module.exports=new  mongoose.model('services', services);
