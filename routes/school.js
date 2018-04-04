var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
//var School = require('../models/School.js');
var School = mongoose.model('School', new mongoose.Schema(), 'schools');

/* GET ALL SCHOOLS */
router.get('/', function(req, res, next) {
  // var query = School.find({}).select('CODESC COD_ESC_TX NO_ENTIDAD ENDERECO NUMERO BAIRRO location');
  // var query = School.find({}).select('-_id type geometry properties');
  var query = School.find({lat:{$ne:"NA"},lon:{$ne:"NA"}}).select('codesc detalhes.nomeesc detalhes.endereco detalhes.numero detalhes.bairro lat lon');
  query.lean().exec(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE SCHOOL BY ID ("_id"). For example: '58dd2c8be6f8cc9ae0fcfec4' */
router.get('/:id', function(req, res, next) {
  School.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* ok - GET SCHOOLS LIST WHOSE NO_ENTIDAD LIKE 'TEXT'*/
/*router.get('/search', function(req, res, next) {
  var query = School.find({ NO_ENTIDAD: { $regex: '.*' + req.query.text + '.*' } }).select('ID NO_ENTIDAD BAIRRO');
  query.exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});*/

/* ok - GET SCHOOLS LIST WHOSE NO_ENTIDAD LIKE 'TEXT'*/
/*router.get('/search', function(req, res, next) {
  School.aggregate({$match: {NO_ENTIDAD: {$regex: '.*' + req.query.text + '.*'}} }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});*/

// ok
/*router.get('/search', function(req, res, next) {
  School.aggregate(
    {
      // $match: {NO_ENTIDAD: {$regex: '.*' + text_tmp + '.*'}}
      $match: {
        NO_ENTIDAD: {
          $regex: new RegExp(req.query.text,'ig')
        }
      }
      // $match: {NO_ENTIDAD: {$regex: new RegExp('^' + text_tmp , 'i')}}
      // $match: {NO_ENTIDAD: {$regex: new RegExp('.*' + text_tmp , 'i')}}
      // $match: {$text: {$search: req.query.text,$language: "none",$caseSensitive: false,$diacriticSensitive: false}}
    },
    {
      $project: {
        NO_ENTIDAD:1,
        NO_ENTIDAD_BAIRRO: { $concat: [ "$NO_ENTIDAD", " - ", "$BAIRRO" ] }
      }
    }, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});*/

/* GET SCHOOLS LIST WHOSE NO_ENTIDAD LIKE 'TEXT'*/
router.get('/search/:name', function(req, res, next) {
  School.aggregate(
    {
      $match: {
         "detalhes.nomeesc": {
          $regex: new RegExp(req.params.name,'ig')
        }
      }
    },
    {
      $project: {
        nomeesc:1,
        nomeesc_bairro: { $concat: [ "$detalhes.nomeesc", " - ", "$detalhes.bairro" ] }
      }
    }, function (err, post) {
      if (err) return next(err);
      res.json(post);
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
