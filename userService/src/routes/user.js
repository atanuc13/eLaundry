const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController') 
const upload         = require('../middleware/upload') 
const authenticate = require('../middleware/authenticate')
const auth = require('../middleware/auth')

router.get('/auth/:tagId',authenticate)
router.get('/:tagId',auth,userController.index)
router.post('/show',userController.show)
router.post('/store',upload.single('avatar'),userController.store)
router.post('/update', userController.update)
router.post('/delete',userController.destroy)

module.exports = router