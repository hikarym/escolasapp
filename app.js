var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');

var route = require('./routes/route.js');
var school = require('./routes/school.js');
var search = require('./routes/search.js');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = require('./config/db-config.js');

// Call connection to MongoDB on localhost:27017
/*mongoose.connect('mongodb://172.16.1.32/escolasdb', {config: {autoIndex: false}, useMongoClient: true})
//mongoose.connect('mongodb://localhost/escolasdb', { useMongoClient: true })
  .then( (res) => console.log('connection successful'))
.catch(
    (err) => console.error(err)
);*/
mongoose.connect(db.url, {config: {autoIndex: false}, useMongoClient: true});
mongoose.connection;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use(route);
app.use('/school', school);
app.use('/search', search);

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
