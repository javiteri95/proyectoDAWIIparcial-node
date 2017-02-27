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
  	res.render("ejerciciosProfesor"/*, { rol: rol }*/);}
  //}else if (rol == 'estudiante'){
  	else{
  	res.render("ejerciciosEstudiante"/*,{ rol: rol }*/);}
  //}
});

router.post('/subir',function (req,res,next) {
	var fs = require('fs')

   
    var file = req.files.ejercicio,
      name = file.name,
      type = file.type,
      path = __dirname + "/data/resueltos/" + name
  ;
   var format = type.split("/");

if(format[1] === "py"){

    fs.rename(req.files.ejercicio.path, path, function(err){
      if(err) res.send("Ocurrio un error al intentar subir la imagen");
         probarCodigo(path) 
          //estId = id del estudiante en la sesion 
          esEjercicio = req.body.ejercicio;
          if(dificultad == "FACIL"){
          		puntaje = 3;
          }


    });
}else{
  fs.unlink(file.path);
  res.send("El formato debe ser py");
} 

})





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
	console.log("Inicio");
	console.log(titulo);
	console.log(descripcion);
	console.log(ePath);
	console.log(sPath);
	console.log(etiquetas);
	console.log(dificultad);
	console.log("Inicio");
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
