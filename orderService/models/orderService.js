const mongoose =require('mongoose');
const orderServiceSchema = mongoose.Schema({
    uId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    lId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    detail:{
        type: mongoose.Schema.Types.Mixed,
        required:true
    },
    status:{
         type: String,
        default: true
    },
    userAddress:{
        type: String,
        default:true

    }
}, {
    timestamps: true
}); 
orderServiceSchema.detail =[{
    name: { type: String },
    price: { type: String},
    service: { type: String},
    quantity: { type: String}
}];





orderServiceSchema.pre('save', async function(next) {
    const laundry = this;
    laundry.uId = mongoose.Types.ObjectId(laundry.uId);
    laundry.lId = mongoose.Types.ObjectId(laundry.lId);
    next();
});

module.exports = mongoose.model('orderService',orderServiceSchema); 