var express = require('express');
var router = express.Router();
var Ejercicio = require('../models/ejercicio')

/* GET home page. */
/*
router.get('/', function(req, res, next) {

  res.render('usuario');
});
*/

router.get('/', function(req, res, next) {
  Ejercicio.find({}, function(err, ejers) {
    var ejerMap = {};

    ejers.forEach(function(ejer) {
      ejerMap[ejer._id] = ejer;
    });

    res.send(ejerMap);  
  });
});

router.post('/', function(req, res, next) {
  	var titulo = req.body.titulo;
	var descripcion = req.body.descripcion;
	var datosEntrada = req.body.entradas;
	var datosSalida = req.body.salidas;
	var etiquetas = req.body.etiquetas;
	var dificultad = req.body.dificultad;

		// Validation
	var errors = req.validationErrors();

	if(errors){
		res.render('Ejercicio',{
			errors:errors
		});
		console.log('hay errores')
		console.log(errors)
	} else {
		var nuevousuario = new Usuario({
			nombres: nombres,
			apellidos:apellidos,
			correo: correo,
			rol: rol,
			carrera : carrera,
			tipoI : tipoI,
			password : password,
			identificacion : identificacion
		});

		Usuario.createUsuario(nuevousuario, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/usuario');
	}
});


module.exports = router;
