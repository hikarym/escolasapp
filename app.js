var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

// Call connection to MongoDB on localhost:27017
mongoose.connect('mongodb://172.16.1.32/escolasdb', {config: {autoIndex: false}, useMongoClient: true})
//mongoose.connect('mongodb://localhost/escolasdb', { useMongoClient: true })
  .then((res) => console.log('connection successful'))
  .catch((err) => console.error(err));

var app = express();
var staticRoot = __dirname;

// view engine setup configuration
//app.set('src', path.join(__dirname, 'src'));
// app.engine('.html', require('ejs').renderFile);
//app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(staticRoot, 'dist')));

/*var school = require('./routes/school2.js');
app.use('/escola', school);*/
var school = require('./routes/school');
app.use('/school', school);
var search = require('./routes/search.js');
app.use('/search', search);

app.get('/', function (req, res) {
  res.sendFile(path.join(staticRoot, 'index.html'))
});

app.get('/geolocation', function (req, res) {
  res.sendFile(path.join(staticRoot, 'index.html'))
});

// catch 404 and forward to error handler
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
});

module.exports = app;
