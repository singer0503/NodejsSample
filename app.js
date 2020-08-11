// 這邊是 AppDynamics 的 agent 監控設定
require("appdynamics").profile({
  controllerHostName: 'presidio202002102005254.saas.appdynamics.com',
  controllerPort: 443,
  
  // If SSL, be sure to enable the next line
  controllerSslEnabled: true,
  accountName: 'presidio202002102005254',
  accountAccessKey: 'jmmv15qjdgn2',
  applicationName: 'nodeSample',
  tierName: 'node1',
  nodeName: 'process' // The controller will automatically append the node name with a unique number
 });


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/member');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
