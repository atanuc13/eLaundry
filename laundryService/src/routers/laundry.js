const express = require('express');
const router = express.Router();
const Laundry = require('../models/laundry');

router.get('/laundries/:id', async(req, resp) => {
    try {
        const laundry = await Laundry.findById(req.params.id);
        resp.send(laundry);
    } catch (error) {
        resp.status('400').send(error);
    }
});


router.get('/laundriesbycollegeid/:id', async(req, resp) => {
    try {
        const laundries = await Laundry.find({ collegeId: req.params.id });
        resp.send(laundries);
    } catch (error) {
        resp.status('400').send(error);
    }
});


router.post('/laundries', async(req, resp) => {
    try {
        const laundry = new Laundry({
            ...req.body
        });
        await laundry.save();
        resp.status('201').send(laundry);
    } catch (error) {
        resp.status('400').send(error);
    }
});


router.put('/laundries/:id', async(req, resp) => {
    try {
        let laundry = await Laundry.findById(req.params.id);
        if (!laundry) {
            return resp.status('404').send('Not Found!');
        }
        laundry.products = req.body.products;
        await laundry.save();
        resp.status('200').send(laundry);
    } catch (error) {
        resp.status('400').send(error);
    }
});


module.exports = router;