// creating a model for Census weighting areas (Areas de ponderaçao) - Ap collection
var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;


var WeightingAreaSchema = new mongoose.Schema({
  type : String, // Feature
  /*geometry : {
    type : String, //MultiPolygon
    coordinates : Array //[[[],[],[]],[[],[],[]]]
  },*/
  geometry : {
    //type: {type: String, default: 'MultiPolygon'},
    coordinates: {type: Array, required: true}  //[[[],[],[]],[[],[],[]]]
  },
  properties : {
    codap : SchemaTypes.Long, // NumberLong("3530607005007"),
    cod_gr : Number, // 3,
    cod_uf : Number, // 35,
    cod_me : Number, // 3515,
    cod_mi : Number, // 35062,
    cod_rm : Number, // 20,
    cod_mu : Number, // 3530607,
    nom_gr : String, // "REGIAO SUDESTE",
    nom_uf : String, // "SAO PAULO",
    nom_me : String, // "METROPOLITANA DE SAO PAULO",
    nom_mi : String, // "MOGI DAS CRUZES",
    nom_rm : String, // "RM SAO PAULO",
    nom_mu : String, // "MOGI DAS CRUZES"
  }
  //updated_at: { type: Date, default: Date.now },
});

var wa = mongoose.model('WeightingArea', WeightingAreaSchema);
module.exports = wa;
