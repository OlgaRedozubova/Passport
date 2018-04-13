var cookieParser = require('cookie-parser');
var session = require('express-session');

var  MSSQLStore = require('mssql');

module.export = {
  createStore: function () {
    var config = {
      user: "test",
      password: '12345',
      server: 'localhost',
      port: 1433,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      }
    }
    return new MSSQLStore(config);
  }
}