const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('we are in admin');
    // we will call html here.
});

// For Institution
router.get('/institutions', async(req, res) => {
    const institution = require('../models/institution');
    try {
        const inst = await institution.find();
        res.json(inst);
    } catch (err) {
        res.json(err);
    }
});

//Add new institutions 
router.post('/institutions', async(req, res) => {
    const institution = require('../models/institution');
    const inst = new institution({
        name: req.body.name
    });
    try {
        const saveInstitution = await inst.save();
        res.json(saveInstitution);
    } catch (err) {
        res.json({ message: err });
    }


});

// For Services

//Show services
router.get('/services', async(req, res) => {
    const services = require('../models/services');
    try {
        const serv = await services.find();
        res.json(serv);
    } catch (err) {
        res.json(err);
    }


});

router.post('/services', upload.single('imgPath'), async(req, res) => {
    const services = require('../models/services');
    let img
    if (req.file) {
        img = req.file.path

    }
    console.log(img)
    const serv = new services({
        name: req.body.name,
        imgPath: img
    });
    try {
        const saveService = await serv.save();
        res.json(saveService);
    } catch (err) {
        res.json({ message: err });
    }

});

router.put('/services', (req, res) => {
    res.send('editServices');

});

module.exports = router;