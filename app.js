var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var databaseurl = process.env.DATA_BASE_URL;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectRouter = require('./routes/projectRoute');
var complaintRouter = require('./routes/complaintRoute');
var packRouter = require('./routes/packRoute');
//Database acccess
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mindstake", {useNewUrlParser: true, useUnifiedTopology: true}, 
()=>console.log("success connection with DB"));



var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));


app.set('view engine', 'jade');

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  next();
});




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectRouter);
app.use('/complaints', complaintRouter);
app.use('/packs',packRouter);
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

app.set('port',process.env.PORT)

module.exports = app;
