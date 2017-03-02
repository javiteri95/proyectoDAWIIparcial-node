var mongoose     = require('mongoose');
var bcrypt = require('bcryptjs');
var Q=require('q');
//-------------------------------------------------------------------------
/* Viteri, por qué me comentas esto, me genera inconvenientes :C no puedo acceder a la base cuando pruebo,
 yo no necesito comentar la tuya, no me da inconveneientes*/
 //jaja es que a mi se me da incovenientes...., se me cae a penas pruebo
 //PD voy a poner la conexion en app.js 
 /**
var mongoDB = 'mongodb://javiteri:1234@ds051873.mlab.com:51873/proyecto_daw';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/
var Schema = mongoose.Schema;

var curso = new Schema({
	profesor :String,
	paralelo : Number, 
	estudiantes : String
});

var Curso = mongoose.model('curso', curso);

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

module.exports.saveUsers = function(cursos) {
  Curso.collection.insert(cursos, function callback(error, insertedDocs) {
    // Here I use KrisKowal's Q (https://github.com/kriskowal/q) to return a promise, 
    // so that the caller of this function can act upon its success or failure
    if (!error)
      return Q.resolve(insertedDocs);
    else
      return Q.reject({ error: error });
  });
}