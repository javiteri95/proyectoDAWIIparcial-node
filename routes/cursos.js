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

    res.render('cursos', { listaCursos: courseMap , rol : req.user.rol });  
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
	var paralelo=req.params.paralelo;
	Curso.getCursoByParalelo(paralelo,function(err,curso){
		if(err) throw err;
		console.log(curso);
		res.send(curso);
	});

});

router.get('/profesor/:profesor',function(req,res,next){
	var profesor=req.params.profesor;
	console.log(profesor);
	Curso.getCursoByProfesor(profesor,function(err,curso){
		if(err) throw err;
		console.log(curso);
		res.send(curso);
	});

});

router.delete('/eliminar/:_id',function(req,res,next){
	console.log(req.params._id);
	var id=req.params._id;
	Curso.findByIdAndRemove(id,function(err,course){
		if (!err) {
	        res.json({type : 'success'})
	    }
	    else {
	        res.json({type : 'error'})
	    }
	})
});

router.put('/editar/:_id', function(req, res, next) {


	Curso.findById(req.params._id, function (err, course) {
	  if (err) {
	  	var error = {type : 'error' , error : err}
	  	res.json(error)
	  }else{
	  	  course.paralelo = req.body.paralelo;
	  	  course.estudiantes = req.body.estudiantes;
	  	  course.profesor=req.body.profesor;
		  course.save(function (err, updatedCurso) {
		    if (err) {
		    	var error = {type : 'error' , error : err}
	  			res.json(error)
		    }else{
		    	var data = { type : 'success' , course : updatedCurso}
		    	res.json(data);
		    }

		  });

	  }
	  

	});
});


module.exports = router;
