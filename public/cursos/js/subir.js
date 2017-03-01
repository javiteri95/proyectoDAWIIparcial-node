
$(document).ready(function() {
	iniciador();
	$("#bot").click(function(event) {
		archivovalido(event)
		});
	console.log($("#bot"))
});


function iniciador(){
	var url = "data/ejercicios.json";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){

				
				if (xhttp.readyState ==4 && xhttp.status == 200){
					//console.log(xhttp.status);
					//console.log(xhttp.response);
					var json = JSON.parse(xhttp.responseText) ;
					
					i=0;

						progress=document.createElement("div")
									$(progress).addClass('progress')
									barra=document.createElement("div")
										$(barra).addClass("progress-bar progress-bar-info")
										mensaje=json[i].hecho+"% Exitos"
										$(barra).html(mensaje)
										$(barra).attr({
											role: 'progressbar',
											"aria-valuenow": json[i].hecho,
											"aria-valuemin": '0',
											"aria-valuemax": '99',
										});
										ancho=json[i].hecho/2+"%"
										$(barra).css('width', ancho);
									$(progress).append(barra)
						

									formu=document.createElement("form")
										url= document.location.href;
										$(formu).attr({'action': "#","method":"get"});
										lab=document.createElement("label")
											$(lab).addClass('custom-file')
											inp=document.createElement("input")
												$(inp).addClass('custom-file-input')
												$(inp).attr({
													"lang": 'es',
													"type": 'file',
													"id": 'file'
												});
												spa=document.createElement("span")
													$(spa).addClass('custom-file-control')
												$(inp).append(spa)
											$(lab).append(inp)
										bot = document.createElement("button")
											$(bot).addClass('btn btn-primary')
											$(bot).html("Enviar")
											$(bot).attr('type', 'submit');
										$(formu).append(lab)
										$(formu).append(bot)
										$(formu).append(document.createElement("div"))


						if(json[i].dificultad=="FACIL"){
			
							color = "rgba(0,255,0,0.3);"	
						}
						if(json[i].dificultad=="MEDIO"){
							color = "rgba(19, 177, 203, 0.71);"
						}
						if(json[i].dificultad=="DIFICIL") {
							
							color = "rgba(189, 30, 63, 0.61);"
						}

						$("#accordion .container").append(
							'<div class="panel panel-default name="' + i + '">' + 
								'<div class="panel-heading" role="tab" id="heading' + i + '">' + 
									'<h4 class="panel-title ">' + 
										'<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+ i +'" aria-expanded="false" aria-controls="collapse'+ i + '">'+
											json[i].titulo + 
										'</a>' + 
									'</h4>' + 
								'</div>' +  
								'<div id="collapse'+ i + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+ i +'">' + 
									'<div class="panel-body">'+
										'<div class="row">'+
											'<div class=\"col-lg-12 ">'+
												'<div class=\"col-xs-12 col-sm-12 col-md-12\">'+
													'<p class="acordeon-title"> <br> Autor</b></p> '+
													'<p class="acordeon-content"> '+ json[i].autor +' </p>'+
												'</div>'+
												'<div class=\" col-lg-12\">'+
													'<p class="acordeon-title"> <b> Dificultad</b></p> '+
													'<p class="acordeon-content" style="width: 10%; background-color:'+color+'"">'+ json[i].dificultad +' </p>'+
												'</div>'+
												'<hr>'+
												'<div class="Descripcion">'+
													'<p class="acordeon-title"> <b> Descripcion</b></p> '+
													'<p class="acordeon-content"> '+ json[i].descripcion +' </p>'+
												'</div>'+
												'<div class="Entradas">'+
													'<p class="acordeon-title"> <b> Entradas</b></p> '+
													'<p class="acordeon-content"> '+ json[i].entradas +' </p>'+
												'</div>'+
												'<div class="Salidas">'+
													'<p class="acordeon-title"> <b> Salidas</b></p> '+
													'<p class="acordeon-content"> '+ json[i].salidas +' </p>'+
												'</div>'+
												'<div class="Input">'+
													'<p class="acordeon-title"> <b> Subir archivo</b></p> '+
													$(formu).html()+
												'</div>'+
												'<div class="etiquetas">'+
													'<p class="acordeon-title"> <b> Etiquetas</b></p> '+
													'<p class="acordeon-content"> '+ json[i].etiquetas +' </p>'+
												'</div><hr>'+
												'<div class="aprobados">'+
													$(progress).html()+
												'</div>'+

												
											'</div>'+
										'</div>'+
									'</div>' + 
								'</div>' +
							'</div>'

						)





								
				}
			}
			
			xhttp.open("GET", url);
			xhttp.send();
}



function archivovalido(evento) {
	console.log("me llaman")
	boton = evento.target
	formula=$(boton).parent("form")
	input = $(formula).find("input")[0]
	mensaje=""
	if($(input).val()==""){
		mensaje = "COMPLETE Y SUBA EL ARCHIVO"

	}
	else {
		mensaje = "ENVIO EXITOSO"
	}
	$($(formula).find("div")[0]).html(mensaje)
}