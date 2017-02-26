var express = require('express');
var router = express.Router();
var Ejercicio = require('../models/ejercicio')

/* GET home page. */
/*
router.get('/', function(req, res, next) {

  res.render('usuario');
});
*/

router.get('/api/', function(req, res, next) {
  Ejercicio.find({}, function(err, ejers) {
    var ejerMap = {};

    ejers.forEach(function(ejer) {
      ejerMap[ejer._id] = ejer;
    });

    res.send(ejerMap);  
  });
});

router.get('/', function(req, res, next) {
  var rol = req.user.rol;
  console.log(rol)
  if(( rol == 'profesor') || (rol == 'ayudante')){
  	res.render("ejerciciosProfesor", { rol: rol });
  }else if (rol == 'estudiante'){
  	res.render("ejerciciosEstudiante",{ rol: rol });
  }
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
		var nuevousuario = new Ejercicio({
			titulo : titulo,
			descripcion : descripcion, 
			datosEntrada : datosEntrada,
			datosSalida : datosSalida,
			etiquetas : etiquetas,
			dificultad : dificultad
		});

		Ejercicio.createEjercicio(nuevousuario, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'Ejercicio creado correctamente');

		res.redirect('/ejercicio');

	}
});


module.exports = router;
