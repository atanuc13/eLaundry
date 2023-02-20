const express = require('express');
const router = express.Router();
const Post = require('../models/orderService');



// post an Order
router.post('/', async (req, res) => {

    const post = new Post({
        uId: req.body.uId,
        lId: req.body.lId,
        userAddress: req.body.userAddress,
        status: req.body.status,
        detail: req.body.detail
    });
    try {
        await post.save();
        res.status('201').send(post);
    } catch (err) {
        res.status('400').send(err);
    }

});
//get for filter on UserId
router.get('/orderbyuId/:id', async (req, resp) => {
    try {
        console.log(req.params.id)
        const laundries = await Post.find({ uId: req.params.id });
        resp.send(laundries);
    } catch (error) {
        resp.status('400').send(error);
    }
});
//get for filter on LaundaryId
router.get('/orderbylId/:id', async (req, resp) => {
    try {
        const laundries = await Post.find({ lId: req.params.id });
        resp.send(laundries);
    } catch (error) {
        resp.status('400').send(error);
    }
});

//Update a status
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { status: req.body.status } }
        );
        res.json(updatePost);

    }
    catch (err) {
        res.json({ message: err });
    }
});
module.exports = router;
