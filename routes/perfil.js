var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('perfil', { rol : req.user.rol});
});



module.exports = router;