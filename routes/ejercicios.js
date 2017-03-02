var express = require('express');
var router = express.Router();
var Ejercicio = require('../models/ejercicio')
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
  //if(( rol == 'profesor') || (rol == 'ayudante')){
  	if(false){
  	res.render("ejerciciosProfesor",{ rol: "profesor"}/*, { rol: rol }*/);}
  //}else if (rol == 'estudiante'){
  	else{
  	res.render("ejerciciosEstudiante",{message:"", rol: "estudiante"}/*,{ rol: rol }*/);}
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
     	var options = {
			  mode: 'text',
			  scriptPath: './public/data/resueltos',
			  args: [en]
			};

			PythonShell.run(file.name, options, function (err, results) {
			  if (err) throw err;
			  
			  // results is an array consisting of messages collected during execution
			  fs.readFile("./public/"+ruta, 'utf-8', (err, data) => {
				  if(err) {
				    console.log('error: ', err);
				  } else {
				  	if(results != null && results != "" && results != undefined){
				  		resu = []

				  		for (var i = 0; i < results.length; i+=2) {
				  			resu.push(results[i])
				  		}

				  		pro = []
				  		array =data.split("\r\n")
				  		M = resu.length
				  		N = array.length
				  		console.log(M);
				  		console.log(N);
					  	if(M!=N){
					  		res.render("errorPython",{error: "Su código no da los resultados correctos"})
					  	}
					  	else{

					  		for (var i = 0; i < array.length; i++) {
					  			a1 = array[i];
					  			b1 =resu[i].slice(0, -1)

					  			pro.push(a1)
					  			pro.push(b1)
					  			if(a1 != b1){
					  				console.log(pro);
					  				
					  				res.render("errorPython",{error: "Su código no da los resultados erroneos"})
					  			}
					  		}
					  		console.log("Resultados correctos");

					  		console.log(idEstudiante);
					  		console.log(idE);
					  		console.log(puntaje);


					  		var nuevoPuntaje = new EjercicioEstudiante({
								estudianteID : idEstudiante,
								estudianteN : req.user.nombres,
								estudianteA : req.user.apellidos ,
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
	  res.send("El formato debe ser py");
		} 
	}
});





router.post('/', function(req, res, next) {
  	var titulo = req.body.titulo;
	var descripcion = req.body.descripcion;
	var datosEntrada = req.body.entradas;
	var datosSalida = req.body.salidas;
	var etiquetas = req.body.etiquetas;
	var dificultad = req.body.dificultad;

	var fs = require('fs')

   console.log(req.files);

   if (!req.files){console.log("no hay archivos");}
   else{
    let fileE = req.files.entradas;
    origen = '../proyectoDAWIIparcial-node/public/'
    ent = '/data/entradas/';
    ePath = ent+fileE.name
     fileE.mv(origen+ePath,function (err) {
     	if (err) console.log(err);
     	console.log("Entradas subidas");
     })
     let fileS = req.files.salidas;
     sal = '/data/salidas/';
     sPath = sal+fileS.name;
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


module.exports = router;