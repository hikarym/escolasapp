var express = require('express');
var router = express.Router();
var WeightingArea = require('../models/WeightingArea.js');
var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;

/* GET ALL Weighting Areas */
router.get('/', function(req, res, next) {
  var query = WeightingArea.find({}).select('type geometry properties');
  query.exec(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Weighting Area BY ID ("_id"). For example: '59a5e7fb0d86ed043f00c949' */
/*router.get('/:id', function(req, res, next) {
  WeightingArea.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});*/

/* GET SINGLE Weighting Area BY codap. For example: '3550308005010' */
router.get('/search', function(req, res, next) {
  var query = WeightingArea.find({"properties.codap": req.query.text}).select('-_id type geometry properties');
  query.exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
  /*console.log(req.query.text);
  var query = WeightingArea.find({});
  query.exec(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });*/
});

module.exports = router;
