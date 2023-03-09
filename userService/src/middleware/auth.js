const jwt = require('jsonwebtoken')
const { builtinModules } = require('module')
const User = require('../models/User')

const authenticate = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,'AB(jfb)k')
        var roleId = req.params.tagId
        req.user = decode
        console.log(decode)
        User.findById(decode._doc._id)
        .then(response => {
            if(decode._doc._id==response._id && decode._doc.email == response.email && decode._doc.role == response.role)
                {
                if(decode._doc.role == roleId)
                        {
                            next()
                        }
                    else{
                        res.status(401).json({
                            message:"Unauthorized"
                        })
                    }
                }
            else
                {
                    res.status(403).json({
                        message:"User data not found"
                    })  
                }
        })
        .catch(error => {
            res.status(401).json({
                message: 'An error Occured!'
            })
        }) 

                
            
        
        
    }
    catch(error){
        if(error.name="TokenExpiredError"){
            res.status(401).json({
                message:"Token Expired!"
            })
        }else{
            res.json({
                message: 'Authentication Failed'
            })
        }
       
    }
}

module.exports = authenticate