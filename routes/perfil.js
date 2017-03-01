var express = require('express');
var router = express.Router();
var Estudiante = require('../models/usuario')
var EjercicioEstudiante = require('../models/ejercicioEstudiante');
var Usuario = require('../models/usuario');
var Ejercicio = require('../models/ejercicio')
var badgesEstudiante = require('../models/badgesEstudiante')
/*
router.get('/', function(req, res, next) {
	res.render('perfil', { rol : req.user.rol});
});

*/
router.get('/quemar', function(req, res, next) {
	Usuario.findById(req.user.id, function (err, user) { 
		 Ejercicio.findById('58b599e19375a30f8c4c5f36', function(err, ejercicio){
		 	var nuevousuario = new  EjercicioEstudiante({
		 		estudiante : user.id ,
		 		ejercicio : ejercicio.id ,
		 		calificacion : 50 	 		
			});
		 	EjercicioEstudiante.createEjercicioEstudiante( nuevousuario ,function(err, ejeEst){
		 		if (err){
		 			console.log('error')
		 			console.log(err)
		 		}else{
		 			console.log('exito');
		 			console.log(ejeEst);
		 		}
		 	})
		 });


	});
});

router.get("/", function(req,res,next){
	Estudiante.findById(req.user.id, function(err, user){
		if (err){
			res.render("perfil",{type : "error", data : err , rol : req.user.rol})
		}else{
			var nombres = user.nombres
			var apellidos = user.apellidos
			var correo = user.correo
			EjercicioEstudiante.find({estudiante : req.user.id}, function(error, ejercicioEst){
				if (error){
					res.render("perfil",{type : "error", data : error, rol : req.user.rol})
				}else{
					var notaTotal = 0;
					var ejerciciosResueltos = ejercicioEst.length;
					for (i = 0 ; i < ejercicioEst.length ; i++){
						notaTotal += ejercicioEst[i].calificacion 
					}
					badgesEstudiante.find({estudiante : req.user.id}, function(error2, ejercicioB){
						if (error2){
							res.render("perfil",{type : "error", data : error2 , rol : req.user.rol})
						}else{
							if (ejercicioB.length == 0){
								var data = {
									nombres : nombres ,
									apellidos : apellidos ,
									correo : correo ,
									notaTotal : notaTotal ,
									ejerciciosResueltos : ejerciciosResueltos ,
									badges : []
								}

							}else{
								var data = {
									nombres : nombres ,
									apellidos : apellidos ,
									correo : correo ,
									notaTotal : notaTotal ,
									ejerciciosResueltos : ejerciciosResueltos ,
									badges : ejercicioB.badges
								}

							}	
							console.log(ejercicioB);
							res.render('perfil', {type : 'success', data : data , rol : req.user.rol})
						}

					});


				}

			})
		}
	})

});


module.exports = router;