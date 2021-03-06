//Import the mongoose module
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Q=require('q');


//--------------------realiza la conexion---------------------------
//Set up default mongoose connection
/*
var mongoDB = 'mongodb://javiteri:1234@ds051873.mlab.com:51873/proyecto_daw';
mongoose.connect(mongoDB);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/
//----------------------------------------------------------------------------------------------
//instancia el esquema
var Schema = mongoose.Schema;

//crea el esquema usarios
var usuarioS = new Schema({
	correo : String,
	password : String,
	rol : {
		type : String,
		enum : ['estudiante','profesor','administrador','ayudante']
	},
	tipoI : {
		type : String,
		enum : ['matricula','cedula']
	},
	identificacion : String,
	nombres : String,
	apellidos : String,
	carrera : String
});

//lo setea en la base de datos

var Usuario = mongoose.model("usuario", usuarioS);

//lo envia para exportar
module.exports = Usuario;

module.exports.createUsuario = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUsuarioByCorreo = function(correo, callback){
	var query = {correo: correo};
	Usuario.findOne(query, callback);
}

module.exports.getUsuarioById = function(id, callback){
	Usuario.findById(id, callback);
}

module.exports.getUsuarioByNombreYApellidos= function(nombre,apellidos, callback){
	var query = {nombres: nombres,apellidos:apellidos};
	console.log("entra aqui 0")
	Curso.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}


module.exports.saveUsers = function(usuarios) {
  Usuario.collection.insert(usuarios, function callback(error, insertedDocs) {
    // Here I use KrisKowal's Q (https://github.com/kriskowal/q) to return a promise, 
    // so that the caller of this function can act upon its success or failure
    if (!error)
      return Q.resolve(insertedDocs);
    else
      return Q.reject({ error: error });
  });
}

module.exports.cambiarPassword = function(idUser, newPassword, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newPassword, salt, function(err, hash) {
	    	newPassword = hash;
	    	Usuario.update({ _id: idUser }, { $set: { password: newPassword }}, callback);
	    });
	});


}
