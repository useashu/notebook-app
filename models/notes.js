const mongoose=require("mongoose");
const NotesSchema = mongoose.Schema({
    user:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'user'
   },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
  });
   let Notes=mongoose.model("Notes",NotesSchema);
module.exports = Notes;
