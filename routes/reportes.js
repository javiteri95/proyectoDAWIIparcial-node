var express = require('express');
var router = express.Router();

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



module.exports = router;