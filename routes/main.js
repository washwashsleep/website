var express = require('express');
var router = express.Router();
var db = require('../models/mongo');

module.exports.index = function(req, res) {
  res.render('index', { title: 'Express' });
};
module.exports.signin = function(req, res) {
  console.log(req.body)
  db.user.findOne({ pass:req.body.pass, $or:[{email:req.body.email},{email:req.body.name}] }, function (err, data){
    // console.log(err)
    req.body.session = req.body.name
    console.dir(data)
  })
  // res.render('index', { title: 'Express' });
  res.redirect('/')
};
module.exports.signup = function(req, res) {
  if (req.body.pass === req.body.verifypass ){
    delete req.body.verifypass
    db.user.insert(req.body, function (err, data){
      if(err)
        console.error(err)
      console.log(data)
    })
  }
  // var doubles = req.body.map(function(num) {
  //   return console.log(num)
  // });
  // console.log(doubles)
  // db.test.find(req.body).toArray(function (err, data){
  //   // console.log(err)
  //   console.dir(data)
  // })
  // res.render('index', { title: 'Express' });
  res.redirect('/signin')
};
module.exports.ticket = function(req, res) {
  db.test.insert(req.body, function (err, data){
    if(err)
      console.error(err)
    console.log(data)
  })
  res.redirect('/')
};

function obj2string(){

}