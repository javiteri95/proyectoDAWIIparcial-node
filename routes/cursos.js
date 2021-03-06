var express = require('express');
var router = express.Router();
var Curso = require('../models/curso');
var Usuario = require('../models/usuario');
var fs = require('fs');
var nodemailer = require('nodemailer');

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

router.get('/profesores',function (req,res,next) {
	profesores = [];
	Curso.find({},function (err,cursos) {
		cursos.forEach(function (curso) {
			prof = curso.profesor
			if(!profesores.includes(prof)){
				profesores.push(prof)
			}
		})
		profes = {}
		profes.prof = profesores;
		res.send(profesores)
	})
	
})

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
		    		
		    		allRows.forEach(function (linea) {
		    				console.log( "ROWS:"+linea)
		    				curso = linea.split(";")
		    				console.log(curso)
		    				if(/([A-Z]([a-z]+))+/.test(curso[0])){
						      prof=curso[0]
						    }
						    else{
						    	res.render('cursos', { listaCursos: courseMap , rol : req.user.rol, error:errmesg});
						  	}

						  	if((/[0-9]+/.test(curso[1]))){
						    para= parseInt(curso[1])
						    et=curso[2]

						    Curso.getCursoByParalelo(para,function(err,curso){

						    	var nuevocurso=[]
		    					var usus = []
								if(err) res.render('cursos', { listaCursos: courseMap , rol : req.user.rol, error:errmesg});
								else{
									var estudiantess = et.split(',')
									console.log(estudiantess)
					   		est=[]
					   		for (var i = 0; i < estudiantess.length; i++) {
					   			var e=estudiantess[i].split('-');
					   			console.log(e);
					   			var ec=e[0];
					   			var em=e[1];
					   			var en=e[2];
					   			var ea=e[3];
					   			var eca=e[4];
					   			var estu=""+e[2]+" "+e[3];est.push(estu);
						      if ((/([A-Z]([a-z]+))/.test(en))&&(/([A-Z]([a-z]+))/.test(ea))) {
						      	
									usus.push( new Usuario({
																nombres: en,
																apellidos:ea,
																correo: ec,
																rol: "estudiante",
																carrera : eca,
																tipoI : "matricula",
																password : "1234",
																identificacion : em
															}));


						      }
						      
						    }}
						    if(est.length ==0){
						    	console.log("estudiantes vacio")
						    	errmesg = "";
						    	res.render('cursos', { listaCursos: courseMap , rol : req.user.rol, error:errmesg});
						    }
							console.log("false")
						    nuevocurso.push( {
								profesor: prof,
								paralelo: para,
								estudiantes : JSON.stringify(est)
							});
							
							console.log("hola")
	  				console.log(nuevocurso)
	  				console.log(usus)
	  				Usuario.saveUsers(usus)
	  				Curso.saveUsers(nuevocurso)
						})
						    
						} 	
						   else{
						    res.render('cursos', { listaCursos: courseMap , rol : req.user.rol, error:errmesg});
						 	} //
		    		
		    	})
		    }
		    	 res.render('cursos', { listaCursos: courseMap , rol : "administrador", error:"Csv subido exitosamente"});
		    	
		  });

})
					 

	}	})	

	}else{
	  res.send("El formato debe ser csv");
		}

}});

module.exports = router;
