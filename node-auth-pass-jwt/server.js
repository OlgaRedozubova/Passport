var express = require('express');
bodyParser = require('body-parser');
app = express();

var morgan = require('morgan');
var mongoose = require('mongoose');
var cars = require('cars');
var passport = require('passport');
var config = require('./config/database');
var port = processevn.PORT || 3000;
mongoose.connect(config.db, {
  useMongoClient:true
});

mongoose.Promise = global.Promise;
require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./routes/routes')(app, passport);
app.listen(port, function () {
  console.log('Server is running on port ' + port);
})
