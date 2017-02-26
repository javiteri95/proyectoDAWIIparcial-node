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
function agregar(){
	console.log("agregando");
}
function agregarEstudiante(){
	var inp = document.createElement("input");
	$(inp).attr('type','text');
	$(inp).attr('name','estudiante');
	$(inp).addClass("col-lg-10");
	$(inp).css('margin-left','0px');
	$(inp).css('float','left');
	$("#llenar").append(inp);
}