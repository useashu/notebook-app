const express=require("express");
const connectDB = require('./db');
// var cookieParser = require('cookie-parser')

var cors = require('cors')
connectDB();
const app=express();
app.use(cors());
// app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notesroutes"));
//  const PORT=process.env.PORT || 5000;
const PORT=5000;
//  if(process.env.NODE_ENV === "production"){
//      app.use(express.static("inotebook/build"));
//  };

app.listen(PORT,function(){
    console.log(`server is running at port ${PORT}`);
});
