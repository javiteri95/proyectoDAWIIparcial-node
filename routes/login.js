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

router.post('/',
  passport.authenticate('local', {successRedirect:'/usuario', failureRedirect:'/',failureFlash: true}),
  function(req, res) {
  	console.log("aqui redirige")
    res.redirect('/usuario');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/');
});


module.exports = router;
