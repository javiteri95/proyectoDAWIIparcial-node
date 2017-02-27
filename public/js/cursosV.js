$(document).ready(function(){
    $('.tablaCursos').DataTable();
    tomar();
    
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
    	$("#todosC").css('display','block');
    	$('#profC').css('display','none');
    	$.ajax({
		      url: '/cursos/todos',
		      type: 'GET',
		      dataType: 'json',
		      data:{},
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
    else
    	if (op=="porProfesor") {
    		$("#todosC").css('display','none');
    		$('#profC').css('display','block');
    	}
}
function agregar(){
	var prof=$("#prof").val();
	var para=$("#paral").val();
	var llena=$("#llenar input");
	var est=[];
	console.log(prof);
	console.log(para);
	console.log(llena);
	if ((/([A-Z]([a-z]+))+/.test(prof)) && (/[0-9]+/.test(para))) {
		for (var i = llena.length - 1; i >= 0; i--) {
			console.log(llena[i]);
			if (/([A-Z]([a-z]+))+/.test($(llena[i]).val())) {
				console.log($(llena[i]).val());
				est.push($(llena[i]).val());
			}
		}
	console.log(est);
	 $.ajax({
      url: '/cursos/agregar',
      type: 'POST',
      dataType: 'html',
      data: {profesor: prof, paralelo: para, estudiantes: JSON.stringify(est)},
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
});
		console.log("agregando");
		$("body").removeClass('modal-open');
	    $("#myModal").removeClass('in');
	    $("#myModal").css('display', 'none');
		$(".modal-backdrop").remove();
		tomar();
	}
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
function porProfesor(){
	console.log($("#profC .row #pro").val());
	var p=$("#profC .row #pro").val();
    		$.ajax({
    			url: '/cursos/profesor/'+p,
    			type: 'GET',
			    dataType: 'json',
			    data: {profesor: p},
    		})
    		 .done(function(resp) {
		      console.log("success");
		      console.log(resp);
		    })
		    .fail(function(resp) {
		      console.log("error");
		      console.log(resp);
		    })
		    .always(function() {
		      console.log("complete");
		});
}