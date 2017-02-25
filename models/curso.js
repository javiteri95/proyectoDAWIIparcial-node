var mongoose     = require('mongoose');
var bcrypt = require('bcryptjs');
//-------------------------------------------------------------------------
/**
var mongoDB = 'mongodb://javiteri:1234@ds051873.mlab.com:51873/proyecto_daw';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/
var Schema       = mongoose.Schema;

var curso = new Schema({
	profesor :{
		type: String
	} ,
	paralelo : Number, 
	estudiantes : {
		type: [String]
	}
});

var Curso = mongoose.model('Curso', curso);

module.exports = Curso;

module.exports.createCurso = function(newCurso, callback){
	newCurso.save(callback);
}

module.exports.getCursoByParalelo = function(paralelo, callback){
	var query = {paralelo: paralelo};
	console.log("entra aqui 0")
	Curso.findOne(query, callback);
}

module.exports.getCursoByProfesor = function(profesor, callback){
	var query = {profesor: profesor};
	console.log("entra aqui 0")
	Curso.find(query, callback);
}