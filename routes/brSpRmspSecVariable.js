var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var BrSpRmspSecVariables = mongoose.model('BrSpRmspSecVariables', new mongoose.Schema(), 'brSpRmspSecVariables');

/* GET ALL socioeconomic variables for Brasil, SP, RMSP */
router.get('/', function(req, res, next) {
  var query = BrSpRmspSecVariables.find({});
  query.lean().exec(function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
});

/* GET the variable informations of a SINGLE VARIABLE BY ID ("_id"). For example: '5ac3aa1461f5122e72625935' */
router.get('/:id', function(req, res, next) {
  BrSpRmspSecVariables.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET the variable informations of a SINGLE VARIABLE BY NIVEL ("nivel"). For example: 'Estado de SP' */
router.get('/:nivel', function(req, res, next) {
  var query = BrSpRmspSecVariables.find({nivel: req.params.nivel});
  query.lean().exec(function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
});

/* Get the data of a Nivel's variable*/
router.get('/:nivel/:secvariablename', function(req, res, next){
  var query = BrSpRmspSecVariables.find({nivel: req.params.nivel}).select(req.params.secvariablename);
  query.lean().exec(function (err, result){
    if (err) return next(err);
    res.json(result);
  });
});
