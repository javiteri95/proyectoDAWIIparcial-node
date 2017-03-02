var mongoose     = require('mongoose');

//-------------------------------------------------------------------------
var Schema       = mongoose.Schema;

var ejercicioEstudiante = new Schema({
	estudianteID : { type: Schema.Types.ObjectId, ref: 'Usuario', required: true  },
	estudiante : String,
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
	var query = {estudianteID: idEstudiante};
	ejerE = EjercicioEstudiante.find(query,callback);
}
 
module.exports.createEjercicioEstudiante = function(newEjercicioEstudiante, callback){
	newEjercicioEstudiante.save(callback);	
}

module.exports.findByEstudianteNombre = function (estudianteNombre, callback) {
	var query = {estudiante: estudianteNombre};
	ejerE = EjercicioEstudiante.find(query,callback);
}

module.exports.calcularNotaEstudianteNombre = function (estudianteNombre) {
	var query = {estudiante: estudianteNombre};
	ejerE = EjercicioEstudiante.find(query,function (err,ests) {
		var suma = 0;
		ests.forEach(function (est) {
			suma = suma + est.calificacion;
		})
		console.log(suma);
		return suma
	});
}