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
    		$(".agregado").remove();
    	}
    else
    	if (op=="porParalelo") {
    		$("#todosC").css('display','none');
    		$('#profC').css('display','none');
    		$('#paraC').css('display','block');
    		$(".err").remove();
    		$(".agregado").remove();
    	}
}

function verifU(nombres){
    	return ($.ajax({
    			url: '/usuario/nombre/'+nombres,
    			type: 'GET',
			    dataType: 'json',
			    data: {nombres: nombres},
    		})
    		 .done(function(resp) {
    		 	console.log(resp);
		      if(resp.usuario==""){
		      	console.log("no sirve");
		      	return false;
		      }else{
		      	console.log("si sirve");
		      	return true;
		      }
		      
		    })
		    .fail(function(resp) {
		      console.log("error");
		      console.log(resp);
		      return false;
		    }))
}

function agregar(){
	$(".err").remove();
	var prof=$("#prof").val();
	var para=$("#paral").val();
	var llena=$("#llenar input");
	var est=[];
	console.log(verifU(prof))
	console.log(verifU(prof).responseText);
	if ((/([A-Z]([a-z]+))+/.test(prof)) && (/[0-9]+/.test(para))) {
		for (var i = llena.length - 1; i >= 0; i--) {
			console.log(llena[i]);
			if ((/([A-Z]([a-z]+))/.test($(llena[i]).val()))&&(verifU($(llena[i]).val()))) {
				est.push($(llena[i]).val());
			}
		}
	console.log(est);
	$.ajax({
    			url: '/cursos/paralelo/'+para,
    			type: 'GET',
			    dataType: 'json',
			    data: {paralelo: para},
    		})
    		 .done(function(resp) {
		      console.log("success");
		      console.log(resp);
		   	  var error=document.createElement("span");
				$(error).css('color','red');
				$(error).html("El paralelo ya existe");
				$(error).addClass("col-lg-10");
				$(error).addClass("err");
				$(error).css('margin-left','0px');
				$(error).css('float','left');
				var br=document.createElement("br");
				$("#llenar").append(br);
				$("#llenar").append(error);
		    })
		    .fail(function(resp) {
		      console.log("error");
		      console.log(resp);
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
		    })
		    .always(function() {
		      console.log("complete");
		});
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
	$(".oculto").css('display','none');
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
		      $(".oculto").css('display','block');
		      $(".oculto").css('background-position','left-center');
		      agregarEst("paraC",resp);
		    })
		    .fail(function(resp) {
		      console.log("error");
		      console.log(resp);
		      var error=document.createElement("span");
				$(error).css('color','red');
				$(error).html("No existe el praralelo");
				$(error).addClass("col-lg-10");
				$(error).addClass("err");
				$(error).css('margin-left','0px');
				$(error).css('float','left');
				var br=document.createElement("br");
				$("#paraC .row .inpor").append(br);
				$("#paraC .row .inpor").append(error);
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
	$(error).html("Ingrese los datos correctamente; campos profesor y paralelo requeridos, al menos un estudiante; o es probable que los usuarios no existan");
	$(error).addClass("col-lg-10");
		$(error).addClass("err");
		$(error).css('margin-left','0px');
		$(error).css('float','left');
	return error;
}
function agregarEst(tipo,r){
	switch(tipo) {
    case "paraC":
    	if (!($.isEmptyObject(r))) {
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
	        	var td=document.createElement("td");
	        	$(tr).addClass("agregado");
	        	$(td).addClass("agregado");
	        	$(td).html(e[i]);
	        	$(tr).append(td);
	        	$("#estpar").append(tr);
	    	}
	    }
	    else{
	    	var error=document.createElement("span");
				$(error).css('color','red');
				$(error).html("No existe el paralelo");
				$(error).addClass("col-lg-10");
				$(error).addClass("err");
				$(error).css('margin-left','0px');
				$(error).css('float','left');
				var br=document.createElement("br");
				$("#paraC .row .inpor").append(br);
				$("#paraC .row .inpor").append(error);	
	    }
        break;
    case "profC":
    	if (!($.isEmptyObject(r))) {
	    	var th=document.createElement("th");
	        $(th).addClass("agregado");
	        $(th).html("Profesor: "+r[0].profesor);
	        $("#encabpf").append(th);
	        for (var i = r.length - 1; i >= 0; i--) {
	        	var c=r[i];
	        	var tr=document.createElement("tr");
	        	$(tr).addClass("agregado");
		       	var tdi=document.createElement("td");
	        	$(tdi).html(c._id);
	        	$(tdi).addClass("agregado");
	        	$(tdi).css('display','none');
	        	var tdpf=document.createElement("td");
	        	$(tdpf).html(c.paralelo);
	        	$(tdpf).addClass("agregado");
	        	$(tr).append(tdi);
	        	$(tr).append(tdpf);
	        	botones(tr);
	        	$("#estpro").append(tr);
	        }
	    }
	    else{
	    	var error=document.createElement("span");
				$(error).css('color','red');
				$(error).html("No existe el profesor");
				$(error).addClass("col-lg-10");
				$(error).addClass("err");
				$(error).css('margin-left','0px');
				$(error).css('float','left');
				var br=document.createElement("br");
				$("#profC .row .inpor").append(br);
				$("#profC .row .inpor").append(error);
	    }
        break;
    default:
        console.log("No estaba supuesto a entrar aquí");
} 
}
function ver(event,tipo){
	console.log("Hice click")
	if(tipo=="t")
    	var p=$($(event.target).parent("td").siblings("td")[2]).html();
    else
    	var p=$($(event.target).parent("td").siblings("td")[1]).html();
    	if (/[0-9]+/.test(p)){
		$.ajax({
    			url: '/cursos/paralelo/'+p,
    			type: 'GET',
			    dataType: 'json',
			    data: {paralelo: p},
    		})
    		 .done(function(resp) {
		      console.log("success");
		      console.log(resp.estudiantes);
		      modalE(resp);
		    })
		    .fail(function(resp) {
		      console.log("error");
		      console.log(resp);
		      var error=document.createElement("span");
				$(error).css('color','red');
				$(error).html("No existe el praralelo");
				$(error).addClass("col-lg-10");
				$(error).addClass("err");
				$(error).css('margin-left','0px');
				$(error).css('float','left');
				var br=document.createElement("br");
				$("#paraC .row .inpor").append(br);
				$("#paraC .row .inpor").append(error);
		    })
		    .always(function() {
		      console.log("complete");
		});
	}
}
function modalE(e){
	$("#modalE div div div h4.modal-title").html("");
	$(".agregado").remove();
	$("body").addClass('modal-open');
	$("#modalE").addClass('in');
	$("#modalE").css('display', 'block');
	$("#modalE").css('padding-left', '16px');
	$("#modalE").css('margin-top', '16px');
	var div1=document.createElement("div");
	var div2=document.createElement("div");
	$(div1).addClass("modal-backdrop");
	$(div1).addClass("fade");
	$(div1).addClass("in");
	$(div2).addClass("modal-backdrop");
	$(div2).addClass("fade");
	$(div2).addClass("in");
	$("#modalE div div div h4.modal-title").html("Paralelo "+e.paralelo);
	var est=JSON.parse(e.estudiantes);
	var h5=document.createElement("h5");
	$(h5).html("Profesor: "+e.profesor);
	$(h5).addClass("agregado");
	$("#modalE div div .modal-body").prepend(h5);
	var th=document.createElement("th");
	$(th).addClass("agregado");
	$(th).html("Estudiantes");
	$("#modalE div div .modal-body table").prepend(th);
	for(var i in est){
		var tr=document.createElement("tr");
		$(tr).html("    "+est[i]);
		$(tr).addClass("agregado");
		$("#modalE div div .modal-body table").append(tr);
	}
}
function cerrar(){
	$("body").removeClass('modal-open');
			    $("#modalE").removeClass('in');
			    $("#modalE").css('display', 'none');
				$(".modal-backdrop").remove();
				$("#modalP").removeClass('in');
			    $("#modalP").css('display', 'none');
			    
}
function actualizar(event,tipo){
	$("#llenado .err").remove(); $("#llenado .llene").remove();
	if (tipo=="t")
	var p=$($(event.target).parent("td").siblings()[2]).html();
	else
	if(tipo=="p")
	var p=$($(event.target).parent("td").siblings()[1]).html();
else
	if (tipo=='l')
		var p=$($(event.target).siblings("input")[0]).val();
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
		      $(".oculto").css('display','block');
		      $(".oculto").css('background-position','left-center');
		      $("#actualizar div div .modal-body form div #prof").val(resp.profesor);
		      $("#actualizar div div .modal-body form div:nth-child(2) #paral").val(resp.paralelo);
		      var e=JSON.parse(resp.estudiantes);
		      $("#actualizar div div .modal-body form div:nth-child(3) input").val(e[e.length-1]);
		      for (var i = e.length - 2; i >= 0; i--) {
				var inp = document.createElement("input");
				$(inp).attr('type','text');
				$(inp).attr('name','estudiante');
				$(inp).addClass("col-lg-10");
				$(inp).css('margin-left','0px');
				$(inp).css('float','left');
				$(inp).val(e[i]);
				$(inp).addClass("llene");
				$("#llenado").append(inp);
		      }
		    })
		    .fail(function(resp) {
		      console.log("error");
		      console.log(resp);
		      var error=document.createElement("span");
				$(error).css('color','red');
				$(error).html("No existe el praralelo");
				$(error).addClass("col-lg-10");
				$(error).addClass("err");
				$(error).css('margin-left','0px');
				$(error).css('float','left');
				var br=document.createElement("br");
				$("#paraC .row .inpor").append(br);
				$("#paraC .row .inpor").append(error);
		    })
		    .always(function() {
		      console.log("complete");
		});
	}
	$("#actualizar div div .modal-header h4").html("Editar curso")
	$("#actualizar").modal('show');

}
function editar(){
	$(".err").remove();
	var prof=$("#actualizar div div .modal-body form div #prof").val();
	var para=$("#actualizar div div .modal-body form div:nth-child(2) #paral").val();

	var llena=$("#llenado input");
	var est=[];
	var unomas=$("#actualizar div div .modal-body form div:nth-child(3) input").val();
	if ((/([A-Z]([a-z]+))+/.test(prof)) && (/[0-9]+/.test(para))) {
		if (/([A-Z]([a-z]+))+/.test(unomas)) {
		est.push(unomas);
		}
		for (var i = llena.length - 1; i >= 0; i--) {
			console.log(llena[i]);
			if (/([A-Z]([a-z]+))/.test($(llena[i]).val())) {
				est.push($(llena[i]).val());
			}
		}
	console.log(est);
	$.ajax({
		url: '/cursos/paralelo/'+para,
    			type: 'GET',
			    dataType: 'json',
			    data: {paralelo: para},
    		})
		.done(function(resp) {
		      console.log("success");
		      var _id=resp._id;
		      $.ajax({
    			
    			url: '/cursos/editar/'+_id,
    			type: 'PUT',
			    dataType: 'json',
			    data: {paralelo: para,profesor: prof,estudiantes:JSON.stringify(est)},
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
		    }).fail(function(resp) {
		      console.log("error");
		      console.log(resp);
		      var error=document.createElement("span");
				$(error).css('color','red');
				$(error).html("No existe el praralelo");
				$(error).addClass("col-lg-10");
				$(error).addClass("err");
				$(error).css('margin-left','0px');
				$(error).css('float','left');
				var br=document.createElement("br");
				$("#actualizar .row .inpor").append(br);
				$("#actualizar .row .inpor").append(error);
		    })
		    .always(function() {
		      console.log("complete");
		});
		    $("#actualizar").modal('hide');
		}
	else{
		var errmesg=error();
		var br=document.createElement("br");
		$("#llenado").append(br);
		$("#llenado").append(errmesg);
	}
}
function add(){
	var inp = document.createElement("input");
				$(inp).attr('type','text');
				$(inp).attr('name','estudiante');
				$(inp).addClass("col-lg-10");
				$(inp).css('margin-left','0px');
				$(inp).css('float','left');
				$(inp).addClass("llene");
				$("#llenado").append(inp);
}
function botones(o){
	var bv=document.createElement("button");
	var spanv=document.createElement("span");
	var td=document.createElement("td");
	$(spanv).addClass("glyphicon");
	$(spanv).addClass("glyphicon-eye-open");
	$(bv).attr("onclick","ver(event,'p');");
	$(bv).append(spanv);
	$(td).append(bv);
	var be=document.createElement("button");
	var spane=document.createElement("span");
	var tde=document.createElement("td");
	$(spane).addClass("glyphicon");
	$(spane).addClass("glyphicon-edit");
	$(be).attr("onclick","actualizar(event,'p');");
	$(be).append(spane);
	$(td).append(be);
	var bd=document.createElement("button");
	var spand=document.createElement("span");
	$(spand).addClass("glyphicon");
	$(spand).addClass("glyphicon-remove");
	$(bd).attr("onclick","eliminar(event,'p');");
	$(bd).append(spand);
	$(td).append(bd);
	$(o).append(td);
}
function eliminar(event,tipo){
	if(tipo=="t")
	var p=$($(event.target).parent("td").siblings()[2]).html();
	else
		if (tipo=="p") 
    	var p=$($(event.target).parent("td").siblings("td")[1]).html();
    else
    	if (tipo=="l")
    		var p=$($(event.target).siblings("input")[0]).val();
	$("#modalP div div .modal-body p label").html(p);
	$("body").addClass('modal-open');
	$("#modalP").addClass('in');
	$("#modalP").css('display', 'block');
	$("#modalP").css('padding-left', '16px');
	$("#modalP").css('margin-top', '16px');
}
function borrar(){
	var p=$("#modalP div div .modal-body p label").html();
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
		      $.ajax({
		      	url: '/cursos/eliminar/'+resp._id,
    			type: 'DELETE',
			    dataType: 'json',
			    data: {id: resp._id},
		      })
		      .done(function(r) {
		      console.log("success");
		      console.log(r);
		      cerrar();
		      document.location.href="/cursos";
		  })
		      .fail(function(r) {
		      console.log("error");
		      console.log(r);
		  })
		      .always(function(r) {
		      console.log("complete");
		      console.log(r);
		});
		    })
		    .fail(function(resp) {
		      console.log("error");
		      console.log(resp);
		      var error=document.createElement("span");
				$(error).css('color','red');
				$(error).html("No existe el praralelo");
				$(error).addClass("col-lg-10");
				$(error).addClass("err");
				$(error).css('margin-left','0px');
				$(error).css('float','left');
				var br=document.createElement("br");
				$("#modalP div div .modal-body").append(br);
				$("#modalP div div .modal-body").append(error);
		    })
		    .always(function() {
		      console.log("complete");
		});
	}
}