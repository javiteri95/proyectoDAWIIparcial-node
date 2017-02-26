var mongoose     = require('mongoose');

//-------------------------------------------------------------------------
var Schema       = mongoose.Schema;

var ejercicio = new Schema({
	titulo : String,
	descripcion : String, 
	datosEntrada : String,
	datosSalida : String,
	etiquetas : String,
	dificultad : {
		type : String,
		enum : ['FACIL','INTERMEDIO','DIFICIL']
	}
})
;
var Ejercicio = mongoose.model('Ejercicio', ejercicio);

module.exports = Ejercicio;

module.exports.createEjercicio = function(newEjercicio, callback){
	newEjercicio.save(callback);
	
}

module.exports.findDificulty = function (dificulty, callback) {
	var query = {dificultad: dificulty};
	ejercicios = Ejercicio.find(query,callback);
}