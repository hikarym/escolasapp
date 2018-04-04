var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var ApSecVariables = mongoose.model('ApSecVariables', new mongoose.Schema(), 'apSecVariables');

/* GET ALL socioeconomic variables for a AP selected */
router.get('/', function(req, res, next) {
  var query = ApSecVariables.find({codap:{$ne:"NA"}});
  query.lean().exec(function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
});

/* GET the variable informations of a SINGLE AP  BY ID ("_id"). For example: '5ac3a91961f5122e72625650' */
router.get('/:id', function(req, res, next) {
  ApSecVariables.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET the variable informations of a SINGLE AP  BY codap ("codap"). For example: '3503901003001' */
router.get('/:codap', function(req, res, next) {
  var query = ApSecVariables.find({codap: req.params.codap});
  query.lean().exec(function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
});

/* Get the data of a AP's variable*/
router.get('/:codap/:secvariablename', function(req, res, next){
  var query = ApSecVariables.find({codap: req.params.codap}).select(req.params.secvariablename);
  query.lean().exec(function (err, result){
    if (err) return next(err);
    res.json(result);
  });
});
