var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());
var port = 8000;
//зарегистрированные пользователи, которые могут быть авторизированы
var users = [
  {username: 'admin', password: '12345'},
  {username: 'foo', password: 'bar'},
  {username: 'user', password: 'test'}
];

//создание хранилища для сесий
//var sessionHandler = require('./js/session_handler');
var  MSSQLStore = require('connect-mssql')(session);
var  mssql = require('mssql');

var sessionHandler = {
  createStore: function () {
    var config = {
      user: "test",
      password: '12345',
      server: 'localhost',
      port: 8000,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      }
    }
    return new MSSQLStore(config);
  }
};
var store = sessionHandler.createStore();

//регистрируем промежуточный обработчик, что бв парсить кукисы
app.use(cookieParser());
//создание сессии
app.use(session({
  store:store,
  resave: false,
  saveUninitialized: true,
  secret: 'supersecret'
}));

app.get('/', function (req,res) {
  console.log("ok");
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', function (req, res) {
  var foundUser;

  for(var i =0; i< user.length; i++) {
    var u = user[i];
    if(u.username == req.body.username && u.password == req.body.password) {
      foundUser = u.username;
      break;
    }
  }
  if (foundUser !== undefined) {
    req.session.username = foundUser;
    console.log("Login succedes: *", req.session.username);
    res.send('Login successful:'+'sessionID'+req.session.id + '; user' + req.session.username);
  }else {
    console.log("Login failed: ", req.body.username)
    res.status(401).send('L:ogin error');
  }
});

app.get('/check', function (req,res) {
  if (req.session.username){
    res.set('Contaent-Type', 'text/html');
    res.send('<h2>User' + req.session.username + ' is logged in! </h2>')
  } else {
    res.send('not logged in');
  }
});

app.listen(port, function() {
  console.log('app running on port ' + port);
});