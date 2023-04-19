var mongoose = require('mongoose');

var feedBack = new mongoose.Schema({
  
    userId: {
        type:String,
        required:true
    },
    laundryId: {
        type:String,
        required:true
    },
    orderId: {
        type:String,
        required:true
    },
    comment: {
        type:String,
        required:true
    },
    rating: {
        type:String,
        required:true
    }},
    {
        timestamps: true
    }
); 
//Image is a model which has a schema imageSchema

module.exports=new  mongoose.model('feedBack', feedBack);