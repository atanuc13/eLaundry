const jwt = require('jsonwebtoken')
const { builtinModules } = require('module')

const authenticate = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,'AB(jfb)k')
        var roleId = req.params.tagId
        req.user = decode
        console.log(decode)
        
                if(decode.role == roleId)
                    {
                        next()
                    }
                else{
                    res.status(401).json({
                        message:"Unauthorized"
                    })
                }
            
        
        
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