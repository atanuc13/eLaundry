const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unqiue : true,
        require: true,
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        unqiue : true,
        require: true,

    },
    age: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
        minlength : [4,'Password must be atleast 4 character long']
    },
    avatar: {
        type: String,
        require: true,
    },
    role: {
        type: Number,
        require: true
    },
    authenticated: {
        type: Boolean,
        require: true
    }
}, {timestamps: true})

userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

const User = mongoose.model('User', userSchema)
module.exports = User