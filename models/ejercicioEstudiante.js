var mongoose     = require('mongoose');

//-------------------------------------------------------------------------
var Schema       = mongoose.Schema;

var ejercicioEstudiante = new Schema({
	estudiante : { type: Schema.Types.ObjectId, ref: 'Usuario', required: true  },
	ejercicio : { type: Schema.Types.ObjectId, ref: 'Ejercicio', required: true  }, 
	fecha : { type: Date, default: Date.now },
	calificacion : {type: Number, required: true }
})
;
var EjercicioEstudiante = mongoose.model('EjercicioEstudiante', ejercicioEstudiante);

module.exports = EjercicioEstudiante; 