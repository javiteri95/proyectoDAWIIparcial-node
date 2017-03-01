$(document).ready(function(){
    $('.tablaCursos').DataTable();
    tomar();
    
});
function tomar(){
	var elegir=$("#elegir form input");
    var op;
	for (var i = elegir.length - 1; i >= 0; i--) {
    	if(elegir[i].checked){
    		op=$(elegir[i]).val();
    	}
    }
    if(op=="todos"){
    	$("#todosC").css('display','block');
    	$('#profC').css('display','none');
    	$('#paraC').css('display','none');
    	$(".err").remove();
    	$.ajax({
		      url: '/cursos/todos',
		      type: 'GET',
		      dataType: 'html',
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
    		$('#paraC').css('display','none');
    		$(".err").remove();
    	}
    else
    	if (op=="porParalelo") {
    		$("#todosC").css('display','none');
    		$('#profC').css('display','none');
    		$('#paraC').css('display','block');
    		$(".err").remove();
    	}
}
function agregar(){
	var prof=$("#prof").val();
	var para=$("#paral").val();
	var llena=$("#llenar input");
	var est=[];
	if ((/([A-Z]([a-z]+))+/.test(prof)) && (/[0-9]+/.test(para))) {
		for (var i = llena.length - 1; i >= 0; i--) {
			console.log(llena[i]);
			if (/([A-Z]([a-z]+))/.test($(llena[i]).val())) {
				est.push($(llena[i]).val());
			}
		}
	console.log(est);
	if(!($.isEmptyObject(est))){
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
	else{
		var errmesg=error();
		var br=document.createElement("br");
		$("#llenar").append(br);
		$("#llenar").append(errmesg);
	}
	}
	else{
		var errmesg=error();
		var br=document.createElement("br");
		$("#llenar").append(br);
		$("#llenar").append(errmesg);
	}
}
function agregarEstudiante(){
	$("#llenar .err").remove();
	var inp = document.createElement("input");
	$(inp).attr('type','text');
	$(inp).attr('name','estudiante');
	$(inp).addClass("col-lg-10");
	$(inp).css('margin-left','0px');
	$(inp).css('float','left');
	$("#llenar").append(inp);
}
function porProfesor(){
	$(".err").remove();
	$(".agregado").remove();
	var p=$("#profC .row .inpor #pro").val();
	if (/([A-Z]([a-z]+))+/.test(p)){
		$.ajax({
    			url: '/cursos/profesor/'+p,
    			type: 'GET',
			    dataType: 'json',
			    data: {profesor: p},
    		})
    		 .done(function(resp) {
		      console.log("success");
		      console.log(resp);
		      agregarEst("profC",resp);
		    })
		    .fail(function(resp) {
		      console.log("error");
		      console.log(resp);
		    })
		    .always(function() {
		      console.log("complete");
		});
	}
	else{
		var errmesg=error();
		var br=document.createElement("br");
		$("#profC .row .inpor").append(errmesg);
	}

}
function porParalelo(){
	$(".err").remove();
	$(".agregado").remove();
	var p=$("#paraC .row .inpor #par").val();
	if (/[0-9]+/.test(p)){
		$.ajax({
    			url: '/cursos/paralelo/'+p,
    			type: 'GET',
			    dataType: 'json',
			    data: {paralelo: p},
    		})
    		 .done(function(resp) {
		      console.log("success");
		      console.log(resp);
		      agregarEst("paraC",resp);
		    })
		    .fail(function(resp) {
		      console.log("error");
		      console.log(resp);
		    })
		    .always(function() {
		      console.log("complete");
		});
	}
	else{
		var errmesg=error();
		var br=document.createElement("br");
		$("#paraC .row .inpor").append(errmesg);
	}

}
function error(){
	var error=document.createElement("span");
	$(error).css('color','red');
	$(error).html("Ingrese los datos correctamente");
	$(error).addClass("col-lg-10");
		$(error).addClass("err");
		$(error).css('margin-left','0px');
		$(error).css('float','left');
	return error;
}
function agregarEst(tipo,r){
	switch(tipo) {
    case "paraC":
    	$("#estpar .id").html(r._id);
    	var e=JSON.parse(r.estudiantes);
    	var thp=document.createElement("th");
    	$(thp).html("Profesor: "+r.profesor);
    	$(thp).addClass("agregado");
    	var thl=document.createElement("th");
    	$(thl).html("Paralelo: "+r.paralelo);
    	$(thl).addClass("agregado");
    	$("#encabpl").append(thp);
    	$("#encabpl").append(thl);
    	for (var i = e.length - 1; i >= 0; i--) {
    		var tr=document.createElement("tr");
        	$(tr).html(e[i]);
        	$(tr).addClass("agregado");
        	$("#estpar").append(tr);
    	}
        break;
    case "profC":
        console.log("aun no");
        break;
    default:
        console.log("aun no");
} 
}