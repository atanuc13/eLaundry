const path = require('path')
const multer =require('multer')

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'img')
    },
    filename: function(req,file,cb){
        let ext=path.extname(file.originalname)
        cb(null,Date.now() + ext )
    }

})

var upload = multer({
    storage:storage,
    fileFilter: function(req,file,callback){
        console.log(file.mimetype)
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"

        ){
            callback(null,true)
        }else{
            console.log('only jpg and png files suppoted')
            callback(null,false)
        }
    },
    limits: {
        fileSize:1024 * 1024 * 2
    }
})

module.exports = upload