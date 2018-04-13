var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../model/user');
var config = require('../config/database');
module.exports = function (app, passport) {
  app.get('/', function (req, res) {
    res.json('Welcome to my Node');
  });
  app.get();
  app.get();
  app.get();
};