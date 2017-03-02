var express = require('express');
var router = express.Router();



var EjercicioEstudiante = require('../models/ejercicioEstudiante')

router.get('/', function(req, res, next) {
	res.render('reportes', { rol : req.user.rol});
});

router.get('/api', function(req, res, next) {
	var data = [
				 { "paralelo" : 1 ,
					"estudiantes" : { 
						"estudiante1" : {"nombres" : "carlos leon" ,"nota" : 300} , 
						"estudiante2" : {"nombres" : "sebastian fuenzalida" ,"nota" : 280} , 
						"estudiante3":  {"nombres" : "isaac perez" , "apellidos" : "perez" ,"nota" : 220}
					}
				 },
				 { "paralelo" : 2 ,
					"estudiantes" : { 
						"estudiante1" : {"nombres" : "carlos leon"  ,"nota" : 300} , 
						"estudiante2" : {"nombres" : "carlos leon"  ,"nota" : 300} , 
						"estudiante3":  {"nombres" : "carlos leon"  ,"nota" : 300}
					}
				 },
				 { "paralelo" : 3 ,
					"estudiantes" : { 
						"estudiante1" : {"nombres" : "carlos leon"  ,"nota" : 300} , 
						"estudiante2" : {"nombres" : "carlos leon"  ,"nota" : 300} , 
						"estudiante3":  {"nombres" : "carlos leon"  ,"nota" : 300}
					}
				 }];
	res.header('Access-Control-Allow-Origin', "*")
	res.json(data);

});



router.get('/', function(req, res, next) {
	res.render('reportes', { rol : req.user.rol});
});


router.get('/estudiante/:estudiante',function (req,res,next) {
	var estudiante=req.params.estudiante;
	console.log(estudiante);
	EjercicioEstudiante.findByEstudiante(estudiante,function(err,estudiante){
		if(err) throw err;
		console.log(estudiante);
		res.send(estudiante);
	});
})

module.exports = router;