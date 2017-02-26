var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('reportes', { rol : req.user.rol});
});



module.exports = router;