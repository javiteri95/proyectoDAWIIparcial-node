var express = require('express');
var router = express.Router();
var Usuario = require('../models/curso');

router.get('/', function(req, res, next) {
  res.render('cursos');
});

router.get('/todos',function(req, res, next){
	Curso.
});

router.post('/agregar', function(req, res, next) {
  	var profesor = req.body.profesor;
	var paralelo = req.body.paralelo;
	var estudiante = req.body.estudiante;

	console.log(profesor)
	console.log(paralelo)
	console.log(estudiante)

		// Validation
	req.checkBody('profesor', 'profesor requerido').notEmpty();
	req.checkBody('paralelo', 'paralelo requerido').notEmpty();
	req.checkBody('estudiante', 'estudiante requerido').notEmpty();



	var errors = req.validationErrors();

	if(errors){
		res.render('cursos',{
			errors:errors
		});
		console.log('hay errores')
		console.log(errors)
	} else {
		var nuevocurso = new Curso({
			profesor: profesor,
			paralelo: paralelo,
			estudiantes : estudiantes
		});

		Curso.createCurso(nuevocurso, function(err, curso){
			if(err) throw err;
			console.log(curso);
		});

		req.flash('success_msg', 'El curso se ha registrado');

		res.redirect('/cursos');
	}
});

router.get('/:paralelo'),function(req,res,next){
	var paralelo=req.body.paralelo;
	var respuesta=Curso.getCursoByParalelo(paralelo,function(err,user){
		if(err) throw err;
		console.log(user);
	});
	var respuesta={}
	respuesta.paralelo=paralelo;

}


module.exports = router;
