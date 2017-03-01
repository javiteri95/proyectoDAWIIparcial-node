var express = require('express');
var router = express.Router();
var Curso = require('../models/curso');
var fs = require('fs');

router.get('/', function(req, res, next) {
  Curso.find({}, function(err, courses) {
    var courseMap = {};

    courses.forEach(function(course) {
      courseMap[course._id] = course;
    });

    res.render('cursos', { listaCursos: courseMap , rol : req.user.rol, error:""});  
  });
});

router.get('/todos',function(req, res, next){
	Curso.find({}, function(err, courses) {
    var courseMap = {};

    courses.forEach(function(course) {
      courseMap[course._id] = course;
    });

    res.render('cursos', { listaCursos: courseMap , rol : req.user.rol, error:""});  
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

router.post('/subir',function (req,res,next) {
	if (!req.files){console.log("no hay archivos");}
   else{
   	console.log(req.files);
    let file = req.files.csv;


    console.log(file);
    origen = './public/'
    ent = '/data/csv/';
    ePath = ent+file.name;
    type = file.mimetype;
    var format = file.name.split(".");
	if(format[1] === "csv"){

	    file.mv(origen+ePath,function (err) {
     	if (err) {
     		Curso.find({}, function(err, courses) {
		    var courseMap = {};

		    courses.forEach(function(course) {
		      courseMap[course._id] = course;
		    });

		    res.render('cursos', { listaCursos: courseMap , rol : req.user.rol, error:"Hubo un error"});  
		  });
     	}else{
     		Curso.find({}, function(err, courses) {
		    var courseMap = {};

		    courses.forEach(function(course) {
		      courseMap[course._id] = course;
		    });
		    ban = false;
		    fs.readFile("./public/"+ePath, 'utf-8', (err, data) => {
		    	if(err){
		    		res.render('cursos', { listaCursos: courseMap , rol : req.user.rol, error:"Hubo un error"});  
		    	}else{
		    		var allRows = data.split("\r\n");

		    		console.log(allRows)
		    		var nuevocurso=[]
					  for (var i = 0; i < allRows.length; i++) {
					  	if(i==allRows.length-1){
					  		ban = true
					  	}
					  	console.log(i)
					  	console.log( "ROWS:"+allRows[i])
					    curso = allRows[i].split(";")
					    if(/([A-Z]([a-z]+))+/.test(curso[0])){
					      prof=curso[0]
					    }
					    else{
					    	res.render('cursos', { listaCursos: courseMap , rol : req.user.rol, error:errmesg});
					  }
					    if((/[0-9]+/.test(curso[1]))){
					    para= parseInt(curso[1])}
					    else{
					    res.render('cursos', { listaCursos: courseMap , rol : req.user.rol, error:errmesg});
					  }
					    estudiantes = curso[2].split(',')
					    est=[]
					    for (var i = 0; i < estudiantes.length; i++) {
					      if (/([A-Z]([a-z]+))/.test(estudiantes[i])) {
					      est.push(estudiantes[i])
					      }
					    }
					    if(est===[]){
					    	errmesg = "";
					    	res.render('cursos', { listaCursos: courseMap , rol : req.user.rol, error:errmesg});
					    }


					     nuevocurso.push( {
							profesor: prof,
							paralelo: para,
							estudiantes : JSON.stringify(est)
						});

						
					    
						console.log("no se sale")
					  } 
					  console.log(nuevocurso)
					  Curso.createCursos(nuevocurso);
		    	}
		    })
		    	if(ban){
		    	 res.render('cursos', { listaCursos: courseMap , rol : req.user.rol, error:"Csv subido exitosamente"});
		    	}
		  });


					 

			}

     	})
	}else{
	  res.send("El formato debe ser csv");
		} 
	}
});

module.exports = router;
