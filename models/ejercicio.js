var mongoose     = require('mongoose');

//-------------------------------------------------------------------------
var Schema       = mongoose.Schema;

var ejercicio = new Schema({
	titulo : String,
	descripcion : String, 
	datosEntrada : [Object],
	datosSalida : [Object],
	etiquetas : [String],
	dificultad : {
		type : String,
		enum : ['facil','intermedio','dificil']
	}
})
;
var Ejercicio = mongoose.model('Ejercicio', ejercicio);

module.exports = Ejercicio; 