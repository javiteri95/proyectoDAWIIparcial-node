//Import the mongoose module
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//--------------------realiza la conexion---------------------------
//Set up default mongoose connection
var mongoDB = 'mongodb://javiteri:1234@ds051873.mlab.com:51873/proyecto_daw';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
