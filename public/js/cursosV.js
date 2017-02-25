$(document).ready(function(){
    $('#tablaCursos').DataTable();
    tomar();
    $('#elegir').onCh
    
});
function tomar(){
	var elegir=$("#elegir form input");
    console.log(elegir);
    var op;
	for (var i = elegir.length - 1; i >= 0; i--) {
    	if(elegir[i].checked){
    		op=$(elegir[i]).val();
    		console.log(op);
    	}
    }
    if(op=="todos"){
    	$.ajax({
		      url: '/cursos/todos',
		      type: 'GET',
		      dataType: 'json',
		    })
		    .done(function(){
		      console.log("success");
		    })
		    .fail(function() {
		      console.log("error");
		    })
		    .always(function() {
		      console.log("complete");
		});
    	console.log("mostrando todos los cursos de la base");
    }
}