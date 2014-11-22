var mongojs = require('mongojs');
var db = mongojs('mongodb://128.199.223.114:27017/hangee');
var user = db.collection('users');
var test = db.collection('test');

module.exports = {
  user: user
  test: test
};