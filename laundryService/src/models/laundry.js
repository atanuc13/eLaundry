const mongoose = require('mongoose');

const laundrySchema = new mongoose.Schema({
    products: {
        type: mongoose.Schema.Types.Mixed,
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});
laundrySchema.products = [{
    pid: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    price: { type: mongoose.Schema.Types.Mixed }
}];

laundrySchema.pre('save', async function(next) {
    const laundry = this;
    laundry.collegeId = mongoose.Types.ObjectId(laundry.collegeId);
    next();
});
const laundry = mongoose.model('laundries', laundrySchema);

module.exports = laundry;