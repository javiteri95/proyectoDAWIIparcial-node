var express = require('express');
var router = express.Router();
var Ejercicio = require('../models/ejercicio')
var Curso = require('../models/curso')
var EjercicioEstudiante = require('../models/ejercicioEstudiante')
var BadgesEstudiante = require('../models/badgesEstudiante')
var PythonShell = require('python-shell');
var fs = require('fs');
/* GET home page. */
/*
router.get('/', function(req, res, next) {

  res.render('usuario');
});
*/

router.get('/api/', function(req, res, next) {
  Ejercicio.find({profesorOayudante : req.user.id}, function(err, ejers) {
    var ejerMap = {};

    ejers.forEach(function(ejer) {
      ejerMap[ejer._id] = ejer;
    });

    res.send(ejers);  
  });
});

router.delete('/:id',function (req,res,next) {
	id = req.params.id;
	console.log(id);
	


	Ejercicio.findOneAndRemove({ _id: id }, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
});


})

router.get('/api/todos', function(req, res, next) {
  Ejercicio.find({}, function(err, ejers) {
    var ejerMap = {};

    ejers.forEach(function(ejer) {
      ejerMap[ejer._id] = ejer;
    });

    res.send(ejers);  
  });
});

router.get('/api/:dif',function (req,res,next) {
	dificultad = req.params.dif;
	Ejercicio.findDificulty(dificultad, function (err,ejers) {
		var ejerMap = {};
		ejers.forEach(function(ejer) {
      	ejerMap[ejer._id] = ejer;
    	});
    res.send(ejers)
	});
})


router.get('/', function(req, res, next) {
	if(req.user!= undefined){
	  rol = req.user.rol;
	  if(( rol == 'profesor') || (rol == 'ayudante')){

	  	res.render("ejerciciosProfesor",{ rol: "profesor"}/*, { rol: rol }*/);}
	   else {if (rol == 'estudiante'){

	  	res.render("ejerciciosEstudiante",{message:"", rol: "estudiante"}/*,{ rol: rol }*/);}
	  }
	 }else{
	 	res.render("login")
	 }
  //}
});

router.post('/subir',function (req,res,next) {
   	 if (!req.files){console.log("no hay archivos");}
   else{
   	console.log(req.files);
   	idEstudiante = req.user._id;
   	estu = req.user.nombres+ " "+req.user.apellidos
   	console.log(estu);
    let file = req.files.solucion;
    var ruta = req.body.salida;
    var entrada = req.body.entrada;
    var dif = req.body.dif;
    var idE = req.body.idE;
    puntaje = 0;

    if(dif=="FACIL"){
    	puntaje = 5;
    }
    if(dif=="INTERMEDIO"){
    	puntaje = 10;
    }
    if(dif=="DIFICIL"){
    	puntaje =15 ;
    }


    console.log(file);
    origen = './public/'
    ent = '/data/resueltos/';
    ePath = ent+file.name;
    type = file.mimetype;
    var format = file.name.split(".");
	if(format[1] === "py"){
		console.log('es py')
	    file.mv(origen+ePath,function (err) {
     	if (err) console.log(err);
     	dir=""

     	for (var i = 0; i < __dirname.length -6; i++) {
     		letra = __dirname.charAt(i)
     		if(letra != "\\"){
     			dir = dir+ letra
     		}
     		else{
     			dir = dir + "/"
     		}

     	}

     	dir = dir + "public"
     	en = dir+entrada;
     	console.log('voy a empezar array correr python')
     	var options = {
			  mode: 'text',
			  pythonPath: './Python/Portable Python 3.2.5.1/App/python.exe',
			  scriptPath: './public/data/resueltos',
			  args: [en]
			};

			PythonShell.run(file.name, options, function (err, results) {
			  if (err) res.render("ejerciciosEstudiante",{rol: "estudiante" ,message: "Su codigo genera error en Python"});
			  
			  // results is an array consisting of messages collected during execution
			  fs.readFile("./public/"+ruta, 'utf-8', (err, data) => {
				  if(err) {
				    console.log('error: ', err);
				  } else {
				  	if(results != null && results != "" && results != undefined){
				  		resu = []

				  		for (var i = 0; i < results.length; i++) {
				  			resu.push(results[i])
				  		}

				  		pro = []
				  		array =data.split("\r\n")
				  		M = resu.length
				  		N = array.length
				  		console.log(results)
				  		console.log(resu);
				  		console.log(array);
					  	if(M!=N){
					  		res.render("ejerciciosEstudiante",{rol: "estudiante" ,message: "Su código da resultados erroneos"})
					  	}
					  	else{

					  		for (var i = 0; i < array.length; i++) {
					  			a1 = array[i];
					  			b1 =resu[i].slice(0, -1)

					  			pro.push(a1)
					  			pro.push(b1)
					  			if(a1 != b1){
					  				console.log(pro);
					  				res.render("ejerciciosEstudiante",{rol: "estudiante" ,message: "Su código da resultados erroneos"})
					  			}
					  		}
					  		console.log("Resultados correctos");

					  		console.log(idEstudiante);
					  		console.log(idE);
					  		console.log(puntaje);


					  		var nuevoPuntaje = new EjercicioEstudiante({
								estudianteID : idEstudiante,
								estudiante : estu,
								ejercicio : idE, 
								calificacion : puntaje,
							});

					  		EjercicioEstudiante.createEjercicio(nuevoPuntaje, function(err, ejerES){
								if(err) throw err;
								
							});

					  		sem = [];




					  		EjercicioEstudiante.findByEstudiante(idEstudiante,function (err,estudiantes) {
					  			
					  			if(estudiantes.length+1 == 10){
					  				BadgesEstudiante.agregarBadges(idEstudiante,"Novato", function (argument) {
					  					console.log("Novato");
					  				});
					  				
					  			}
					  			if(estudiantes.length+1 == 20){
					  				BadgesEstudiante.agregarBadges(idEstudiante,"PRO", function (argument) {
					  					console.log("PRO");
					  				});
					  				
					  			}
					  			if(estudiantes.length+1 == 30){
					  				BadgesEstudiante.agregarBadges(idEstudiante,"Experto", function (argument) {
					  					console.log("Experto");
					  				});
					  			
					  			}
					  			var hoy = new Date();
					  			semana = 604800000
					  			semanaPasadaMs = hoy.getTime() - semana;
					  			semanaPasada = new Date(semanaPasadaMs)
					  			estudiantes.forEach(function (ejer) {
					  				if(ejer.fecha >= semanaPasada){
					  					sem.push(ejer);
					  				}
					  			});
					  			
					  			if(sem.length+1 == 5){
					  				BadgesEstudiante.agregarBadges(idEstudiante,"Indestructible", function (argument) {
					  					console.log("Indestructible");
					  				});
					  				
					  			}
					  			if(sem.length+1 == 10){
					  				BadgesEstudiante.agregarBadges(idEstudiante,"Duro de Matar", function (argument) {
					  					console.log("Duro de Matar");
					  				});
					  			
					  			}
					  			if(sem.length+1 == 15){
					  				BadgesEstudiante.agregarBadges(idEstudiante,"Rápidos y Furiosos", function (argument) {
					  					console.log("Rápidos y Furiosos");
					  				});
					  			}

					  		});

					  		res.render("ejerciciosEstudiante",{rol: "estudiante" ,message: "Ejercicio exitoso!!!!!"})
					  	}



					}
				  }
				});
			});




     	})
	}else{
	  res.render("ejerciciosEstudiante",{rol: "estudiante" ,message: "El formato debe ser py"});
		} 
	}
});


router.post('/actualizar', function (req,res,next) {
	var id = req.body.identificacion;
	var titulo = req.body.titulo;
	var descripcion = req.body.descripcion;
	var etiquetas = req.body.etiquetas;
	var dificultad = req.body.dificultad;

	Ejercicio.findOneAndUpdate({ _id: id }, { titulo: titulo, descripcion: descripcion, dificultad: dificultad, etiquetas: etiquetas }, function(err, user) {
  if (err) throw err;

  // we have the updated user returned to us
  console.log(user);
});


	if (!req.files){console.log("no hay archivos");}
   else{

   	idFile = new Date()
   	origen = './public/'
    ent = '/data/entradas/';
   	if(req.files.entradas != undefined){

    let fileE = req.files.entradas;
    
    
    ePath = ent+idFile.getTime()+fileE.name
     fileE.mv(origen+ePath,function (err) {
     	if (err) console.log(err);
     	console.log("Entradas subidas");
     	Ejercicio.findOneAndUpdate({ _id: id }, { datosEntrada: ePath}, function(err, user) {
		  if (err) throw err;

		  // we have the updated user returned to us
		  console.log(user);
		});
     })}
     if(req.files.salidas != undefined){
     let fileS = req.files.salidas;
     sal = '/data/salidas/';
     sPath = sal+idFile.getTime()+fileS.name;
     fileS.mv(origen+sPath,function (err) {
     	if (err) console.log(err);
     	console.log("Salidas subidas");
     	Ejercicio.findOneAndUpdate({ _id: id }, { datosSalida: sPath}, function(err, user) {
		  if (err) throw err;

		  // we have the updated user returned to us
		  console.log(user);
		});
     })}
 	}

  	res.redirect('/ejercicios');



})




router.post('/', function(req, res, next) {
  	var titulo = req.body.titulo;
	var descripcion = req.body.descripcion;
	var etiquetas = req.body.etiquetas;
	var dificultad = req.body.dificultad;
	var profesorOayudante = req.user.id;

	var fs = require('fs')

   console.log(req.files);

   if (!req.files){console.log("no hay archivos");}
   else{
    let fileE = req.files.entradas;
    origen = './public/'
    ent = '/data/entradas/';
    idFile = new Date()
    ePath = ent+idFile.getTime()+fileE.name
     fileE.mv(origen+ePath,function (err) {
     	if (err) console.log(err);
     	console.log("Entradas subidas");
     })
     let fileS = req.files.salidas;
     sal = '/data/salidas/';
     sPath = sal+idFile.getTime()+fileS.name;
     fileE.mv(origen+sPath,function (err) {
     	if (err) console.log(err);
     	console.log("Salidas subidas");
     })
  

		// Validation
	var errors = req.validationErrors();
	if(errors){
		res.render('Ejercicio',{
			errors:errors
		});
		console.log('hay errores')
		console.log(errors)
	} else {
		var nuevoEjercicio = new Ejercicio({
			titulo : titulo,
			descripcion : descripcion, 
			datosEntrada : ePath,
			datosSalida : sPath,
			profesorOayudante : profesorOayudante,
			etiquetas : etiquetas,
			dificultad : dificultad
		});

		Ejercicio.createEjercicio(nuevoEjercicio, function(err, ejer){
			if(err) throw err;
			console.log(ejer);
		});

		req.flash('success_msg', 'Ejercicio creado correctamente');

		res.redirect('/ejercicios');

	}}
});




router.get('/mejores', function (req, res, next) {
	data =[]
	Curso.getCursos(function (err,cursos) {
		cursos.forEach(function (curso) {
			c= {}
			c.paralelo = curso.paralelo;
			est = JSON.parse(curso.estudiantes)
			alumnos = []
			est.forEach(function (estud) {
				alu = {}
				alu.nombres = estud
				console.log(estud);
				EjercicioEstudiante.findByEstudianteNombre(estud,function (err,EjerEstu) {
					suma = 0;
					EjerEstu.forEach(function (ejer) {
						var suma = suma + ejer.calificacion
					});
					alu.nota = suma
					console.log(suma);
				})

				alumnos.push(alu);
				alumnos.sort(function (a,b) {
					return (b.nota - a.nota)
				})
				if(alumnos.length > 3){
					alumnos.pop()
				}

			})

			a = {}

			for (var i = 0; i < alumnos.length && i<3; i++) {
				b = i+1
				a["estudiante"+b] = alumnos [1]
			}

			c.estudiantes = a;
			data.push(c)

		})
		res.header('Access-Control-Allow-Origin', "*")
		res.json(data);
	})
	


})

router.get('/mejores2', function (req, res, next) {
	data =[]
	Curso.getCursos(function (err,cursos) {
		for (var i = 0; i < cursos.length; i++) {
			var paralelo = cursos[i].paralelo
			var nombresString = JSON.parse(cursos[i].estudiantes)
			for (var j = 0; j < nombresString.length; j++) {
				var nombreIndividual = nombresString[j]
				EjercicioEstudiante.findByEstudianteNombre(nombreIndividual,function (err,EjerEstu) {

					var notaTotal = 0
					for (var k = 0 ; k<EjerEstu.length ; k++){
						notaTotal += EjerEstu[k].nota
					}
					var dataTemp = {
						paralelo : paralelo ,
						nombreIndividual : nombreIndividual ,
						notaTotal : notaTotal
					}
					console.log(dataTemp)
					data.push(dataTemp)

				})

			}

		}


	})
	console.log(data)
	res.json(data)
})









module.exports = router;