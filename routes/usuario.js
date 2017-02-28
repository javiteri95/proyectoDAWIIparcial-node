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
  Usuario.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    console.log(10)
    console.log(req.user.rol)
    res.render('usuario', { listaUsuarios: userMap , rol : req.user.rol});  
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


router.put('/', function(req, res, next) {


	Usuario.findById(req.body.id, function (err, usuario) {
	  if (err) {
	  	var error = {type : 'error' , error : err}
	  	res.json(error)
	  }else{
	  	  usuario.correo = req.body.correo;
	  	  usuario.nombres = req.body.nombres;
		  usuario.apellidos = req.body.apellidos;
		  usuario.rol = req.body.rol;
		  usuario.tipoI = req.body.tipoI;
		  usuario.identificacion = req.body.identificacion;
		  usuario.carrera = req.body.carrera;

		  usuario.save(function (err, updatedUsuario) {
		    if (err) {
		    	var error = {type : 'error' , error : err}
	  			res.json(error)
		    }else{
		    	var data = { type : 'success' , usuario : updatedUsuario}
		    	res.json(data);
		    }

		  });

	  }
	  

	});
});

router.delete('/', function(req, res, next) {
	console.log(req.body.id)
	Usuario.findByIdAndRemove(req.body.id, function(err, user) {
	    if (!err) {
	        res.json({type : 'success'})
	    }
	    else {
	        res.json({type : 'error'})
	    }
	});
});


module.exports = router;
