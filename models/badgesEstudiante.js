var mongoose     = require('mongoose');

//-------------------------------------------------------------------------
var Schema       = mongoose.Schema;

var badgesEstudiante = new Schema({
	estudiante : { type: Schema.Types.ObjectId, ref: 'Usuario' },
	badges : String
})
;
var BadgesEstudiante = mongoose.model('BadgesEstudiante', badgesEstudiante);

module.exports = BadgesEstudiante; 

module.exports.findByEstudiante = function (idEstudiante, callback) {
	var query = {estudiante: idEstudiante};
	badges = BadgesEstudiante.find(query,callback);
};

module.exports.agregarBadges = function (idEstudiante,badge, callback) {
	BadgesEstudiante.findByEstudiante (idEstudiante,function (err,es) {
		if (err) throw err;
		if(es.length>0){
		est = es[0]
		cambiar = JSON.parse(est.badges);
		cambiar.push(badge);
		guardar = JSON.stringify(cambiar);
		est.badges = guardar;

		est.save(function(err) {
		    if (err) throw err;
		    console.log(guardar);
		    console.log('Estudiante successfully updated!');
		  });
		}
		else{
			cambiar = [badge];
			guardar = JSON.stringify(cambiar);
			ej = new BadgesEstudiante({
				estudiante : idEstudiante,
				badges: guardar
			})
			ej.save(function(ej) {
				console.log(ej);
			})
		}
	})
}