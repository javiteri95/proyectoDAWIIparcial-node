var mongoose     = require('mongoose');

//-------------------------------------------------------------------------
var Schema       = mongoose.Schema;

var ejercicioEstudiante = new Schema({
	estudiante : { type: Schema.Types.ObjectId, ref: 'Usuario' },
	ejercicio : { type: Schema.Types.ObjectId, ref: 'Ejercicio' }, 
	fecha : Date,
	calificacion : Number
})
;
var EjercicioEstudiante = mongoose.model('EjercicioEstudiante', ejercicioEstudiante);

module.exports = EjercicioEstudiante; 