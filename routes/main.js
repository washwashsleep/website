var express = require('express');
var router = express.Router();
var db = require('../models/mongo');

module.exports.index = function(req, res) {
  res.render('index', { title: 'Express' });
};
module.exports.signin = function(req, res) {
  res.render('index', { title: 'Express' });
};
module.exports.signup = function(req, res) {
  res.render('index', { title: 'Express' });
};
