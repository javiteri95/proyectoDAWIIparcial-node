var mongoose     = require('mongoose');

//-------------------------------------------------------------------------
var Schema       = mongoose.Schema;

var curso = new Schema({
	profesor : { type: Schema.Types.ObjectId, ref: 'Usuario' },
	paralelo : Number, 
	proyecto : [{ type: Schema.Types.ObjectId, ref: 'Usuario' }]
})
;
var Curso = mongoose.model('Curso', curso);

module.exports = Curso;