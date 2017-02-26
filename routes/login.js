var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Usuario = require('../models/usuario')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});


passport.use(new LocalStrategy({
	usernameField : 'correo',
	passwordField : 'password'
},
function(correo, password, done) {
   Usuario.getUsuarioByCorreo(correo, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'usuario no existe'});
   	}

   	Usuario.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Contraseña inválida '});
   		}
   	});
   });
  }));




passport.serializeUser(function(user, done) {
  done(null, user.id);
});




passport.deserializeUser(function(id, done) {
  Usuario.getUsuarioById(id, function(err, user) {
    done(err, user);
  });
});



/* antes de angular
router.post('/',
  passport.authenticate('local', {successRedirect:'/usuario', failureRedirect:'/',failureFlash: true}),
  function(req, res) {
  	
    res.redirect('/usuario');
  });
*/

router.post('/',
  passport.authenticate('local', {failureRedirect:'/',failureFlash: true}),
  function(req, res) {
    
    res.redirect('/usuario');
});

  // loggedin
router.get("/loggedin", function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});


//logout
router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/');
});


 


//cambio password
router.post('/cambio', function(req, res){

  Usuario.getUsuarioByCorreo(req.body.correo, function(err, user){
    if(err) throw err;
    if(!user){
      var data = { type : "error" , message : "usuario no existe" };
      res.json(data);
      
    }

    Usuario.comparePassword(req.body.oldPassword, user.password, function(err, isMatch){
      if(err) throw err;
      if(isMatch){
        var id = user._id;
        Usuario.cambiarPassword(id, req.body.newPassword, function(err){
          if (err) throw err;
          var data = {type : "success" , message : "cambio Contraseña exitoso"};
          res.json(data);
        })
        
      } else {
        var data = {type : "error" , message : "Contraseña no valida"};
        res.json(data);
      }
    });
   });

});

module.exports = router;
