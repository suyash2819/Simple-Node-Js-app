const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const schema=new mongoose.Schema({
  firstn:{
    type:String,
    required:true
  },
  lastn:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true
  }
});
schema.plugin(passportLocalMongoose);
var clients = mongoose.model("Client",schema);
module.exports = clients;
