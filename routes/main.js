var express = require('express');
var router = express.Router();
var db = require('../models/mongo');

module.exports.index = function(req, res) {
  if(req.session.faillogin == true){
    req.session.faillogin = '帳號或密碼錯誤'
  }else{
    req.session.faillogin = null
  }
  if(req.session.insert == true){
    req.session.insert = '註冊失敗，請重新註冊'
  }else{
    req.session.insert = null
  }
  if(!req.session.username)
    req.session.username = null;
  res.render('index', { title: 'Express', user: req.session.username, faillogin: req.session.faillogin, insert:req.session.insert});
};
module.exports.signin = function(req, res) {
  db.user.findOne({ pass:req.body.pass, $or:[{email:req.body.email},{name:req.body.email}] }, function (err, data){
    if(!data){
      req.session.faillogin = true
    }else{
      req.session.faillogin = false
      req.session.username = data.email
    }
    res.redirect('/')
  })
};
module.exports.signup = function(req, res) {
  if(req.body.pass === req.body.verifypass ){
    delete req.body.verifypass
    db.user.insert(req.body, function (err, data){
      if(data){
        req.session.insert = true;
      }
    })
  }else{
    req.session.insert = false;
  }
  res.redirect('/')
};
module.exports.ticket = function(req, res) {
  db.test.insert(req.body, function (err, data){
    if(err)
      console.error(err)
    console.log(data)
  })
  res.redirect('/')
};
module.exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/')
};

function obj2string(){
  
}