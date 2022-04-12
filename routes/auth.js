const express=require("express");
const User=require("../models/user");
const router=express.Router();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var fetchuser = require('../middleware/fetchuser');



router.post("/createuser",[
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],async(req,res)=>{
let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
    let user=await User.findOne({email:req.body.email});
    if(user){
      success=false;
      return res.status(400).json({success,error:"Sorry a user with this email already exists "})
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    user=await User.create({
      name:req.body.name,
      email:req.body.email,
      password:secPass
    });
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,process.env.JWT_SECRET);
    res.cookie("jwtoken",authtoken,{exires:new Date(Date.now()+25892000000),httpOnly:true});
    success=true;
    res.json({success,authtoken});
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});

router.post("/login",[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 4 }),
],async(req,res)=>{
 let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body;
  try{
    let user=await User.findOne({email:email});
    if(!user){
      success=false;
      return res.status(400).json({success, error: "Please try to login with correct credentials" })
    }
    const passCompare=await bcrypt.compare(password,user.password);
    if (!passCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }
    const data={
      user:{
        id:user.id
      }
    }
    const username=user.name;
    const authtoken=jwt.sign(data,process.env.JWT_SECRET);
    res.cookie("jwtoken",authtoken,{exires:new Date(Date.now()+25892000000),httpOnly:true});
    success=true;
    res.json({success,authtoken,username});
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});

router.get("/getuser",fetchuser,async(req,res)=>{
  try{
    userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);

  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;
