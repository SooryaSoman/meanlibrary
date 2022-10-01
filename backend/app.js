const express = require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const path= require('path');
var app = new express();
app.use(cors());
app.use(bodyparser.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://soorya:arya@cluster0.dwnuxc7.mongodb.net/LIBretryWrites=true&w=majority');
app.use(express.static('./dist/libapp'));
const BookData = require('./model/books');
const UserData= require('./model/user');
app.post('/api/add',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
    console.log(req.body);
   
     book = {       

        title : req.body.title,
        author : req.body.author,
        price : req.body.price,
        publisher : req.body.publisher
       
   }       
   book= new BookData(book);
   book.save();
});
app.get('/api/books',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
    BookData.find()
                .then(function(books){
                    res.send(books);
                });
});
app.get('/api/:id',  (req, res) => {
 
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
      BookData.findOne({_id:req.params.id})
      .then((book)=>{
          res.send(book);
      });
      console.log("getedit");

  })
  app.put('/api/update',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
    console.log(req.body)
    id=req.body._id,
    title= req.body.title,
    author = req.body.author,
    price = req.body.price,
    publisher = req.body.publisher
  
   BookData.findByIdAndUpdate({"_id":id},
                                {$set:{"title":title,
                                "author":author,
                                "price":price,
                                "publisher":publisher}})
   .then(function(){
       res.send();
   })
 })
app.delete('/api/remove/:id',(req,res)=>{
   
    id = req.params.id;
    BookData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })
  //getUserSignup Details
app.get('/api/getuserdata/:id',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
    _id = req.params.id;
   console.log("userid for getting signup data",id);
   UserData.findOne({'_id':id})
   .then((obj)=>{
       res.send(obj);
   })
   .catch((err)=>{
       console.log("error :signup details ",err)
   })
})
//getUserSignup Details
//adding Signup data
app.post('/api/addsignup',function(req,res){
    console.log("entered")
    var sdata = req.body.sdata;
    console.log("signup data from front end",sdata)
    var signupdata = {
        username:req.body.username,
        email:req.body.email,
          password:req.body.password,
    }
    console.log(signupdata)
    var signup = new UserData(signupdata);
    signup.save()
    .then(result=>{
        res.status(201).json({
            message:"user created",result:result
        });
    })
    .catch((err)=>{
        res.status(500).json({
            error:err
        })
     })})



  app.post('/api/checklogin',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
    console.log(req.body);
     loginemail = req.body.email;
     loginpassword = req.body.password;
    UserData.findOne({'email':loginemail,'password':loginpassword})
    .then((obj)=>{
        if(obj){
            res.status(200)
            res.json(obj);
            console.log("");   }
        else{
            res.status(404);
            res.json({message:["notfound"]})
            console.log("else")
        }})
    .catch((err)=>{
        console.log("error when handling login/signup checking",err)
    })
})


app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/libapp/index.html'));
  })
app.listen(3000, function(){
    console.log('listening to port 3000');
});
