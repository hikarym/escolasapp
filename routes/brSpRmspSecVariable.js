var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var BrSpRmspSecVariables = mongoose.model('BrSpRmspSecVariables', new mongoose.Schema(), 'brSpRmspSecVariables');

/* GET ALL socioeconomic variables for Brasil, SP, RMSP */
/* Teste: http://localhost:3002/br-sp-rmsp-secvariable*/
router.get('/', function(req, res, next) {
  var query = BrSpRmspSecVariables.find({});
  query.lean().exec(function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
});

/* GET the variable informations of a SINGLE VARIABLE BY ID ("_id"). For example: '5ac3aa1461f5122e72625935' */
/* Teste: http://localhost:3002/br-sp-rmsp-secvariable/5ac3aa1461f5122e72625935*/
router.get('/:id', function(req, res, next) {
  BrSpRmspSecVariables.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET the variable informations of a SINGLE VARIABLE BY NIVEL ("nivel"). For example: 'Estado de SP' */
/* Teste: http://localhost:3002/br-sp-rmsp-secvariable/search/Estado%20de%20SP*/
router.get('/search/:nivel', function(req, res, next) {
  var query = BrSpRmspSecVariables.find({nivel: req.params.nivel});
  query.lean().exec(function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
});

/* Get the data of a Nivel's variable*/
/* Teste: http://localhost:3002/br-sp-rmsp-secvariable/search/Estado%20de%20SP/ses.ocup*/
router.get('/search/:nivel/:secvariablename', function(req, res, next){
  var query = BrSpRmspSecVariables.find({nivel: req.params.nivel}).select(req.params.secvariablename);
  query.lean().exec(function (err, result){
    if (err) return next(err);
    res.json(result);
  });
});

module.exports = router;
