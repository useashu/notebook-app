const express=require("express");
const Notes=require("../models/notes");
const router=express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');

router.get("/fetchallnotes",fetchuser,async(req,res)=>{
  try{
    const notes=await Notes.find({user:req.user.id});
    res.json(notes);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/addnote",fetchuser,[
  body('title','Enter a valid Title').isLength({min:3}),
  body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })],async(req,res)=>{
  try{
    const {title,description,tag}=req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const note=new Notes({
      title:title,
      description:description,
      tag:tag,
      user:req.user.id
    });

   const savedNote=await note.save();
   res.json(savedNote);

  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deletenote/:id",fetchuser,async(req,res)=>{
  try{

    let note= await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note=await Notes.findByIdAndDelete(req.params.id);
    res.json({"success":"succsesfully deleted"});
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports=router;
