var mongoose     = require('mongoose');

//-------------------------------------------------------------------------
var Schema       = mongoose.Schema;

var badgesEstudiante = new Schema({
	estudiante : { type: Schema.Types.ObjectId, ref: 'Usuario' },
	badges : [String]
})
;
var BadgesEstudiante = mongoose.model('BadgesEstudiante', badgesEstudiante);

module.exports = BadgesEstudiante; 