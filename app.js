const express = require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const app=express();
const Client=require('./users.js');
const url='mongodb://localhost:27017/nordforth';

//connection
const connect = mongoose.connect(url);
connect.then(() => {
  console.log("connected correctly to server");
});

//using the bodyparser for taking in the details from the header
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine", "ejs");
app.use(express.static('./public'));

//redering the 1st page
app.get('/',(req,res) => {
  res.render('form');
});

//rendering the 2nd page
app.post('/',(req,res) => {
var clients=new Client(req.body);
clients.save()
.then(user => {
    Client.find({}, (err,data) => {
    if(err) throw err;
    res.render('info',{clients:data})
  });
})
.catch(err => {
    console.log(err);
  });
});

//rendering the 3rd page
app.get('/:id',(req,res) => {
  Client.find({_id:req.params.id}, (err,data) => {
    res.render('person',{clients:data})
  });
});

app.listen(3000);
