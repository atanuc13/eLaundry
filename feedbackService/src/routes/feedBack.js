const express = require("express");
const auth = require('../middleware/auth');
const feedBack=require('../models/feedBack');
const router =express.Router();

router.get ('/', (req,res)=>{
    res.send('we are in feedBack service');
    // we will call html here.
});

router.get ('/byorderid/:id', async (req,res)=>{
    id =req.params.id;
    try{
    const feed = await feedBack.find({"orderId":id});
    res.status(200).send(feed);
    }
    catch(err){
        res.json(err);
    }
});

router.get ('/bylaundryid/:id', async (req,res)=>{
    id =req.params.laundryId;
    try{
    const feed = await feedBack.find({"laundryId":id});
    res.status(200).send(feed);
    }
    catch(err){
        res.json(err);
    }
});

//Add new institutions 
router.post ('/', auth,async (req,res)=>{
   const feed=new feedBack({
    userId:req.body.userId,
    laundryId:req.body.laundryId,
    orderId:req.body.orderId,
    comment:req.body.comment,
    rating:req.body.rating
    });
    try{
   const feedBack= await feed.save();
   res.status(201).send(feedBack);
    }
    
    catch(err){
        res.json({message:err});
    }

    
});


module.exports=router;