var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Usuario = require('../models/usuario')

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("entra aqui -1d")
  res.render('login');
});


passport.use(new LocalStrategy({
	usernameField : 'correo',
	passwordField : 'password'
},
function(correo, password, done) {
   Usuario.getUsuarioByCorreo(correo, function(err, user){
   	console.log("entra aqui 1")
   	if(err) throw err;
   	if(!user){
   		console.log("usuario mo existe");
   		return done(null, false, {message: 'usuario no existe'});
   	}

   	Usuario.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			console.log("no existe password");
   			return done(null, false, {message: 'Contraseña inválida '});
   		}
   	});
   });
   console.log("entra aqui 2");
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Usuario.getUsuarioById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/',
  passport.authenticate('local', {successRedirect:'/usuario', failureRedirect:'/login',failureFlash: true}),
  function(req, res) {
  	console.log("aqui redirige")
    res.redirect('/usuario');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/login');
});


module.exports = router;
