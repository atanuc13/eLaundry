const express = require("express");
const upload = require("../middleware/upload");
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, (req, res) => {
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
router.post('/institutions', auth, async(req, res) => {
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

// Delete institution
router.delete('/institutions', auth, async(req, res) => {
    const inst = require('../models/institution');
    console.log(req.body.id);
    try {
        //console.log(inst.findById(req.body.id));
        await inst.findByIdAndRemove(req.body.id);
        res.status(200).send("Deleted");
    } catch (err) {
        res.json(err);
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

router.post('/services', auth, upload.single('imgPath'), async(req, res) => {
    const services = require('../models/services');
    let img
    if (req.file) {
        img = req.file.path
        console.log(img)
        const serv = new services({
            name: req.body.name,
            imgPath: img
        });
        try {
            const saveService = await serv.save();
            res.status(200).json(saveService);
        } catch (err) {
            res.json({ message: err });
        }
    } else {
        res.status(400).send({ "message": "Please select image" });
    }
});

router.patch('/services', auth, upload.single('imgPath'), async(req, res) => {
    const services = require('../models/services');
    let img = null

    //console.log("image: ",img)
    const serviceId = req.body.id
    console.log(serviceId)
    const fs = require('fs');
    const service = await services.findById(serviceId)
    console.log(service._id)
    console.log(service.imgPath)
    if ("file" in req) {
        img = req.file.path
        fs.unlink("./" + service.imgPath, (err) => {
            if (err) {
                console.log("No previous file exist.");
                res.status(400).send("No previous file exist.");
            } else
                console.log("Delete File successfully.");
        });
    } else {
        img = service.imgPath
    }
    if (!(req.body.name)) {

        console.log("name not preset")
        req.name = service.name
    }
    await services.findOneAndUpdate({ _id: service._id }, { name: req.body.name, imgPath: img });
    res.status(200).send("Details Updated successfully");

});

// Service delete

router.delete('/services', auth, async(req, res) => {
    const serv = require('../models/services');
    console.log(req.body.id);
    try {
        const serviceId = req.body.id
        console.log(serviceId)
        const fs = require('fs');
        const service = await serv.findById(serviceId)
        console.log(service._id)
        console.log(service.imgPath)
        fs.unlink("./" + service.imgPath, (err) => {
            if (err) {
                console.log("No previous file exist.");
                res.status(400).send("No previous file exist.");
            } else
                console.log("Delete File successfully.");
        })

        //console.log(inst.findById(req.body.id));
        await serv.findByIdAndRemove(req.body.id);
        res.status(200).send("Deleted");
    } catch (err) {
        res.json(err);
    }
});
module.exports = router;