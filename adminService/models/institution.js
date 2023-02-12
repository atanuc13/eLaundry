var mongoose = require('mongoose');

var institution = new mongoose.Schema({
  
    name: {
        type:String,
        required:true
    }
    
}); 
//Image is a model which has a schema imageSchema

module.exports=new  mongoose.model('institution', institution);