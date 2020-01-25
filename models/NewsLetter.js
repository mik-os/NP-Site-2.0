const mongoose=require("mongoose");

letterSchema=new mongoose.Schema({
  email:{
    type:String,
    trim:true},
  name:{
    type:String,
    trim:true},
  message:{
    type:String,
    trim:true}
});

module.exports = mongoose.model('NewsLetter', letterSchema)
