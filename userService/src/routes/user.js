const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController') 
const upload         = require('../middleware/upload') 
const authenticate = require('../middleware/authenticate')

router.get('/auth/:tagId',authenticate)
router.get('/:tagId',authenticate,UserController.index)
router.post('/show',UserController.show)
router.post('/store',upload.single('avatar'),UserController.store)
router.post('/update', UserController.update)
router.post('/delete',UserController.destroy)

module.exports = router