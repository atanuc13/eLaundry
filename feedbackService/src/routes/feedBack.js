const express = require("express");
const auth = require('../middleware/auth');
const router =express.Router();

router.get ('/', (req,res)=>{
    res.send('we are in feedBack service');
    // we will call html here.
});

router.get ('/byorderid',auth, async (req,res)=>{
    id =req.body.orderId;
    const feedBack=require('../models/feedBack');
    try{
    const feed = await feedBack.find({"orderId":orderId});
    res.status(200).send.json(feed);
    }
    catch(err){
        res.json(err);
    }
});

router.get ('/bylaundryid', async (req,res)=>{
    id =req.body.laundryId;
    const feedBack=require('../models/feedBack');
    try{
    const feed = await institution.find({"laundryId":laundryId});
    res.status(200).send.json(feed);
    }
    catch(err){
        res.json(err);
    }
});

//Add new institutions 
router.post ('/', auth, async (req,res)=>{
    const feedBack=require('../models/institution');
   const feed=new institution({
    userId:req.body.userId,
    laundryId:req.body.laundryId,
    orderId:req.body.orderId,
    comment:req.body.comment,
    rating:req.body.rating
    });
    try{
   const saveInstitution= await feed.save();
   res.send.json(saveInstitution);
    }
    
    catch(err){
        res.json({message:err});
    }

    
});


module.exports=router;