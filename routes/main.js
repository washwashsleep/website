var express = require('express');
var router = express.Router();
var db = require('../models/mongo');

module.exports.index = function(req, res) {
  console.log('我是首頁')
  console.log(req.session)
  if(req.session.faillogin == true){
    req.session.faillogin = '帳號或密碼錯誤'
  }else{
    req.session.faillogin = null
  }
  if(!req.session.username)
    req.session.username = null;
  res.render('index', { title: 'Express', user: req.session.username, faillogin: req.session.faillogin});
};
module.exports.signin = function(req, res) {
  console.log(req.body)
  db.user.findOne({ pass:req.body.pass, $or:[{email:req.body.email},{name:req.body.email}] }, function (err, data){
    if(!data){
      req.session.faillogin = true
      res.redirect('/')
    }else{
      req.session.faillogin = false
      req.session.username = data.email
      res.redirect('/')
    }
  })
  // res.render('index', { title: 'Express' });
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
module.exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/')
};

function obj2string(){

}