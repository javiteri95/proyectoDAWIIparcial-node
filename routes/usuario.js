var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario')

/* GET home page. */
/*
router.get('/', function(req, res, next) {

  res.render('usuario');
});
*/

router.get('/', function(req, res, next) {
  console.log(req.user)
  Usuario.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.render('usuario', { listaUsuarios: userMap });  
  });
});

router.post('/', function(req, res, next) {
  	var nombres = req.body.nombres;
	var apellidos = req.body.apellidos;
	var correo = req.body.correo;
	var password = req.body.password;
	var rol = req.body.rol;
	var tipoI = req.body.tipoI;
	var carrera = req.body.carrera;
	var identificacion = req.body.identificacion;

	console.log(nombres)
	console.log(rol)
	console.log(tipoI)

		// Validation
	req.checkBody('nombres', 'nombre rquerido').notEmpty();
	req.checkBody('apellidos', 'apellido requerido').notEmpty();
	req.checkBody('apellidos', 'correo requerido').notEmpty();
	req.checkBody('correo', 'correo no valido').isEmail();
	req.checkBody('password', 'contrasena requerida').notEmpty();



	var errors = req.validationErrors();

	if(errors){
		res.render('usuario',{
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
