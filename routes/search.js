var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var School = require('../models/Schoooool.js');

/* GET SCHOOLS LIST WHOSE NO_ENTIDAD LIKE 'TEXT'*/
router.get('/', function(req, res, next) {
  if (req.query.text) {
    var query = School.find({NO_ENTIDAD: {$regex: '.*' + req.query.text + '.*'}}).select('ID NO_ENTIDAD BAIRRO');
    query.exec(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  }  else {
    School.findById(req.query.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
      console.log(req.query.id);
    });
  }
});

/* GET SINGLE SCHOOL BY ID */
router.get('/:id', function(req, res, next) {
  School.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
    console.log(req.params.id);
  });
});

/* SAVE ESCOLAS */
router.post('/', function(req, res, next) {
  School.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE ESCOLAS */
router.put('/:id', function(req, res, next) {
  School.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ESCOLAS */
router.delete('/:id', function(req, res, next) {
  School.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
