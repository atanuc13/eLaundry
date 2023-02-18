const { response } = require('express')
const { type } = require('os')
const User = require('../models/User')

//To show list of users

const index = (req,res,next)=> {
    User.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}


//single user by id
const show  = (req,res,next)=> {
    let userID = req.body.userID
    User.findById(userID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//user registering

const store = (req,res,next)=> {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        age: req.body.age,
        role: req.body.role
    })
    if(req.file){
        user.avatar = req.file.path
    }
    user.save()
    .then(response => {
        res.json({
            message:'User added!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

// updating the user

const update = (req,res,next)=> {
    let userID = req.body.userID

    let updatedData ={
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        age: req.body.age,
        role: req.body.role
        
    }

    User.findByIdAndUpdate(userID,{$set: updatedData})
    .then(response => {
        res.json({
            message: 'User updated succesfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//delete an user
const destroy = (req,res,next)=> {
    let userID = req.body.userID
    User.findByIdAndRemove(userID)
    .then(response => {
        res.json({
            message: 'User deleted succesfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}