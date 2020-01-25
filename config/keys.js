const mongoose = require("mongoose");
const path = require('path')
require("dotenv").config()
const connectDB=async()=>{

  await mongoose.connect(`mongodb+srv://username:password@cluster0-#####.mongodb.net/test?retryWrites=true&w=majority`,{ useNewUrlParser: true ,useUnifiedTopology:true,useFindAndModify:false});
  console.log("OK");
}
module.exports = connectDB;
