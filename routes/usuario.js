var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario')
var nodemailer = require('nodemailer');

/* GET home page. */
/*
router.get('/', function(req, res, next) {

  res.render('usuario');
});
*/

router.get('/', function(req, res, next) {
  Usuario.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    console.log(10)
    console.log(req.user.rol)
    res.render('usuario', { listaUsuarios: userMap , rol : req.user.rol});  
  });
});



// setup e-mail data with unicode symbols


router.post('/', function(req, res, next) {
  	var nombres = req.body.nombres;
	var apellidos = req.body.apellidos;
	var correo = req.body.correo;
	var password = req.body.password;
	var rol = req.body.rol;
	var tipoI = req.body.tipoI;
	var carrera = req.body.carrera;
	var identificacion = req.body.identificacion;

	console.log(nombres)
	console.log(rol)
	console.log(tipoI)

		// Validation
	req.checkBody('nombres', 'nombre rquerido').notEmpty();
	req.checkBody('apellidos', 'apellido requerido').notEmpty();
	req.checkBody('apellidos', 'correo requerido').notEmpty();
	req.checkBody('correo', 'correo no valido').isEmail();
	req.checkBody('password', 'contrasena requerida').notEmpty();



	var errors = req.validationErrors();

	if(errors){
		res.json({ type : 'error', error : "Cometio uno o mas errores en el formulario"})
	} else {
		var nuevousuario = new Usuario({
			nombres: nombres,
			apellidos:apellidos,
			correo: correo,
			rol: rol,
			carrera : carrera,
			tipoI : tipoI,
			password : password,
			identificacion : identificacion
		});

		Usuario.createUsuario(nuevousuario, function(err, user){
			if (err){
				res.json({ type : 'error', error : "Algo malo paso"})
			}else{

				var smtpConfig = {
				    host: 'smtp.gmail.com',
				    port: 465,
				    secure: true, // use SSL
				    auth: {
				        user: 'correoparadaw@gmail.com',
				        pass: 'correoParaDaw123'
				    },
				    tls:{
					    rejectUnauthorized: false
					 }
				};
				var transporter = nodemailer.createTransport(smtpConfig);
				var mensaje = "<p> La contraseña asignada a usted es: " + password + "</p> <br><br><p> Por favor proceda a cambiarla </p> "

				// setup e-mail data with unicode symbols
				var mailOptions = {
				    from: '"Daw fundamentos de programacion" <correoparadaw@gmail.com>', // sender address
				    to: correo, // list of receivers
				    subject: 'cambio de contraseña', // Subject line
				    html: mensaje // html body
				};
				transporter.sendMail(mailOptions, function(error, info){
				    if(error){
				        return console.log(error);
				    }
				    console.log('Message sent: ' + info.response);
				});


				console.log(user);
				res.json({type : 'success', usuario : user})
			}
			
		});

	}
});

router.get('/usuario/:nombres/:apellidos',function(req,res,next){
	var nombres=req.params.nombres;
	var apellidos=req.params.apellidos;
	Usuario.getUsuarioByNombreYApellidos(nombres,apellidos,function(err,usuario){
		if(err) throw err;
		console.log(curso);
		res.json({type:'success',usuario:usuario});
	});
})


router.put('/', function(req, res, next) {


	Usuario.findById(req.body.id, function (err, usuario) {
	  if (err) {
	  	var error = {type : 'error' , error : "Algo malo paso"}
	  	res.json(error)
	  }else{
	  	  usuario.correo = req.body.correo;
	  	  usuario.nombres = req.body.nombres;
		  usuario.apellidos = req.body.apellidos;
		  usuario.rol = req.body.rol;
		  usuario.tipoI = req.body.tipoI;
		  usuario.identificacion = req.body.identificacion;
		  usuario.carrera = req.body.carrera;

		  usuario.save(function (err, updatedUsuario) {
		    if (err) {
		    	var error = {type : 'error' , error : "Algo malo paso"}
	  			res.json(error)
		    }else{
		    	var data = { type : 'success' , usuario : updatedUsuario}
		    	res.json(data);
		    }

		  });

	  }
	  

	});
});

router.delete('/', function(req, res, next) {
	console.log(req.body.id)
	Usuario.findByIdAndRemove(req.body.id, function(err, user) {
	    if (!err) {
	        res.json({type : 'success'})
	    }
	    else {
	        res.json({type : 'error'})
	    }
	});
});


router.get('/nombre/:nombre',function (req,res,next) {
	
	Usuario.find({},function (err,usuarios) {
		var bandera = true
		usuarios.forEach(function (usu) {
			nombres = usu.nombres+" "+usu.apellidos;
			console.log(nombres +" - "+req.params.nombre);
		if(nombres === req.params.nombre){
			bandera= false
			console.log("si hay");
			 return res.send({type:'success',usuario:usu});

			};
		})
			if(bandera){
			return res.send({type:'success',usuario:""});
		}
		})
	
	})







module.exports = router;

/*
exports.contact = function(req, res){
    var name = req.body.name;
    var from = req.body.from;
    var message = req.body.message;
    var to = '*******@gmail.com';
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "correoparadaw@gmail.com",
            pass: "*****"
        }
    });
    var mailOptions = {
        from: from,
        to: to, 
        subject: name+' | new message !',
        text: message
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    });
}
*/
