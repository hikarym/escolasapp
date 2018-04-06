var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');

var route = require('./routes/route-noused.js');
var school = require('./routes/school.js');
var weightingArea = require('./routes/weightingArea.js');
var apSecVariable = require('./routes/apSecVariable');
var brSpRmspSecVariable = require('./routes/brSpRmspSecVariable');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Call connection to MongoDB on localhost:27017
var db = require('./config/dbconfig.js');
mongoose.connect(db.url);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use(route);
app.use('/school', school);
app.use('/weightingarea', weightingArea);
app.use('/ap-secvariable', apSecVariable);
app.use('/br-sp-rmsp-secvariable', brSpRmspSecVariable);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});

/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
