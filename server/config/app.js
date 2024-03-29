let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let cors = require('cors')

let mongoose = require('mongoose');
let db = require('./db');

//connecting mongoose to db
mongoose.connect(db.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "Connection error"));
mongodb.once('open', ()=>{
  console.log('Connected to mongodb..');
});

let indexRouter = require('../../routes/index');
let usersRouter = require('../../routes/users');
let incidentRouter = require('../../routes/incident');

let app = express();
app.use(cors());//TODO: For the time being cors enabled for all origins!!

// view engine setup
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/incidents', incidentRouter);


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
