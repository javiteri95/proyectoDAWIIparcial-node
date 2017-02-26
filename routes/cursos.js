var express = require('express');
var router = express.Router();
var Curso = require('../models/curso');

router.get('/', function(req, res, next) {
  Curso.find({}, function(err, courses) {
    var courseMap = {};

    courses.forEach(function(course) {
      courseMap[course._id] = course;
    });

    res.render('cursos', { listaCursos: courseMap , rol : req.user.rol});  
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
		res.redirect('/cursos');
		req.flash('success_msg', 'El curso se ha registrado');
	}
});

router.get('/paralelo/:paralelo'),function(req,res,next){
	var paralelo=req.body.paralelo;
	var respuesta=Curso.getCursoByParalelo(paralelo,function(err,user){
		if(err) throw err;
		console.log(user);
	});
	var respuesta={}
	respuesta.paralelo=paralelo;

}

router.get('/profesor/:profesor'),function(req,res,next){
	var paralelo=req.body.paralelo;
	var respuesta=Curso.getCursoByParalelo(paralelo,function(err,user){
		if(err) throw err;
		console.log(user);
	});
	var respuesta={}
	respuesta.paralelo=paralelo;

}


module.exports = router;
