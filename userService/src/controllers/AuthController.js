const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { decode } = require('punycode')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            age: req.body.age,
            password: hashedPass,
            role: req.body.role,
            authenticated: req.body.authenticated
        })
        user.save()
            .then(user => {
                res.json({
                    message: 'User added!'
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error Occured!'
                })
            })

    })

}
const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    console.log(username, password)
    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                if (user.authenticated) {
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (err) {
                            res.json({
                                error: err
                            })
                        }
                        if (result) {
                            let token = jwt.sign({...user }, 'AB(jfb)k', { expiresIn: '2h' })
                            let refreshtoken = jwt.sign({...user }, 'AB(jfb)k', { expiresIn: '48h' })
                            res.status(200).json({
                                message: 'Login Successful!',
                                token,
                                refreshtoken
                            })
                        } else {
                            res.json({
                                message: 'Password does not matched'
                            })
                        }
                    })
                } else {
                    res.status(401).json({
                        message: "Unautherized"
                    })
                    
                }
            } else {
                res.json({
                    message: 'No User found!'
                })
            }
        })
}

const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, 'AB(jfb)k', function(err, decode) {
        if (err) {
            res.status(400).json({
                err
            })
        } else {
            let token = jwt.sign({...user }, 'thesecrettoken', { expiresIn: '1h' })
            let refreshToken = req.body.refreshToken
            res.status(200).json({
                message: "Token refreshed successfully!",
                token,
                refreshToken
            })
        }
    })
}

module.exports = {
    register,
    login,
    refreshToken
}