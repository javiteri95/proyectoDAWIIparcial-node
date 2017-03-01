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


module.exports.createEjercicio = function(newEjercicio, callback){
	newEjercicio.save(callback);	
}

module.exports.findByEstudiante = function (idEstudiante, callback) {
	var query = {estudiante: idEstudiante};
	ejerE = EjercicioEstudiante.find(query,callback);
}
 
module.exports.createEjercicioEstudiante = function(newEjercicioEstudiante, callback){
	newEjercicioEstudiante.save(callback);	
}

