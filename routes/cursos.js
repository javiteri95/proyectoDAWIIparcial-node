var express = require('express');
var router = express.Router();
var Curso = require('../models/curso');

router.get('/', function(req, res, next) {
  Curso.find({}, function(err, courses) {
    var courseMap = {};

    courses.forEach(function(course) {
      courseMap[course._id] = course;
    });

    res.render('cursos', { listaCursos: courseMap });  
  });
});

router.get('/todos',function(req, res, next){
	Curso.find({}, function(err, courses) {
    var courseMap = {};

    courses.forEach(function(course) {
      courseMap[course._id] = course;
    });

    res.render('cursos', { listaCursos: courseMap });  
  });
});

router.post('/agregar', function(req, res, next) {
  	var profesor = req.body.profesor;
	var paralelo = req.body.paralelo;
	var estudiantes = req.body.estudiantes;

	console.log(profesor)
	console.log(paralelo)
	console.log(estudiantes)

		// Validation
	req.checkBody('profesor', 'profesor requerido').notEmpty();
	req.checkBody('paralelo', 'paralelo requerido').notEmpty();
	req.checkBody('estudiantes', 'estudiante requerido').notEmpty();



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

router.get('/paralelo/:paralelo',function(req,res,next){
	var paralelo=req.body.paralelo;
	var respuesta=Curso.getCursoByParalelo(paralelo,function(err,curso){
		if(err) throw err;
		console.log(curso);
	});
	respuesta.paralelo=paralelo;

});

router.get('/profesor',function(req,res,next){
	var profesor=req.body.profesor;
	var respuesta=Curso.getCursoByProfesor(profesor,function(err,curso){
		if(err) throw err;
		console.log(respuesta);
		console.log(curso);
		res.status(200).jsonp(curso);
	});
	

});


module.exports = router;
