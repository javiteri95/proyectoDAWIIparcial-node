
$(document).ready(function() {
	iniciador();
});


function iniciador(){
	var url = "data/ejercicios.json";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){

				
				if (xhttp.readyState ==4 && xhttp.status == 200){
					//console.log(xhttp.status);
					//console.log(xhttp.response);
					var json = JSON.parse(xhttp.responseText) ;
					
					for (i = 0 ; i<json.length ; i++){

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
						console.log(json[i].dificultad)
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
													'<p class="acordeon-title"> <b> Breve Descripcion</b></p> '+
													'<p class="acordeon-content"> '+ json[i].breve +' </p>'+
												'</div>'+
												'<div class="etiquetas">'+
													'<p class="acordeon-title"> <b> Etiquetas</b></p> '+
													'<a class="btn btn-success" href="subir ejercicio.html"></ejercicio>RESOLVER</a>'+
												'</div><hr>'+
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
			}
			
			xhttp.open("GET", url);
			xhttp.send();
}





function resolverEjercicio(ejercicio) {
	modal = $("#mod")

		mod= document.createElement("div")
			$(mod).addClass('modal fade')
			$(mod).attr({
				"id": 'myModal',
				"role": 'dialog'
			});

			moDial=document.createElement("div")
				$(moDial).addClass('modal-dialog')
				cont=document.createElement("div")
					$(cont).addClass('modal-content')
					head=document.createElement("div")
						$(head).addClass('modal-header')
						but = document.createElement("button")
							$(but).addClass('close')
							$(but).attr({
								"type": 'button',
								"datadismiss": 'modal'
							});
							$(but).html("&times;")
						tit = document.createElement("h4")
							$(tit).addClass('modal-title')
							$(tit).html(ejercicio.titulo)
						$(head).append(but)
						$(head).append(tit)
					body=document.createElement("div")
						$(body).addClass('modal-body')
						res=document.createElement("div")
							$(res).attr('id', 'resolucion');
							$(res).css({
								"width": 'auto',
								"height": '85vh'
							});

							panelDesc= document.createElement("div")
								$(panelDesc).addClass('panel panel-info')
								heDesc=document.createElement("div")
									$(heDesc).addClass('panel-heading')
									titDesc=document.createElement("h3")
										$(titDesc).html("Descripcion")
										$(titDesc).addClass('panel-title')
									$(heDesc).append(titDesc)

								boDesc= document.createElement("div")
									$(boDesc).addClass("panel-body")
									$(boDesc).html(ejercicio.descripcion)	
								$(panelDesc).append(heDesc)
								$(panelDesc).append(boDesc)

							panelIN= document.createElement("div")
								$(panelIN).addClass('panel panel-info')
								heIN=document.createElement("div")
									$(heIN).addClass('panel-heading')
									titIN=document.createElement("h3")
										$(titIN).html("Entradas")
										$(titIN).addClass('panel-title')
									$(heIN).append(titIN)

								boIN= document.createElement("div")
									$(boIN).addClass("panel-body")
									$(boIN).html(ejercicio.entradas)	
								$(panelIN).append(heIN)
								$(panelIN).append(boIN)

							panelOUT= document.createElement("div")
								$(panelOUT).addClass('panel panel-info')
								heOUT=document.createElement("div")
									$(heOUT).addClass('panel-heading')
									titOUT=document.createElement("h3")
										$(titOUT).html("Salidas")
										$(titOUT).addClass('panel-title')
									$(heOUT).append(titOUT)

								boOUT= document.createElement("div")
									$(boOUT).addClass("panel-body")
									$(boOUT).html(ejercicio.salidas)	
								$(panelOUT).append(heOUT)
								$(panelOUT).append(boOUT)

							panelFILE= document.createElement("div")
								$(panelFILE).addClass('panel panel-info')
								heFILE=document.createElement("div")
									$(heFILE).addClass('panel-heading')
									titFILE=document.createElement("h3")
										$(titFILE).addClass('panel-title')
										$(titFILE).html("Subir archivo")
									$(heFILE).append(titFILE)

								boFILE= document.createElement("div")
									$(boFILE).addClass("panel-body")
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
										bot = document.createElement("a")
											$(bot).addClass('btn btn-primary')
											$(bot).html("Enviar")
											$(bot).click(function(event) {
												archivovalido(event)
											});
										$(formu).append(lab)
										$(formu).append(bot)
										$(formu).append(document.createElement("div"))
									$(boFILE).append(formu)


								$(panelFILE).append(heFILE)
								$(panelFILE).append(boFILE)
							$(res).append(panelDesc)
							$(res).append(panelIN)
							$(res).append(panelOUT)
							$(res).append(panelFILE)
						$(body).append(res)
					$(cont).append(head)
					$(cont).append(body)
				$(moDial).append(cont)
			$(mod).append(moDial)
		$(modal).append(mod)
}


function archivovalido(evento) {
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




function mostrarEjercicios(ejercicios) {
	console.log("")
	contenido = $(".content")	
	//console.log(ejercicios)
	$(contenido).empty()
	$(contenido).css('backgroundColor', 'white');
	//$(contenido).append($(document.createElement("h1")).html("Ejercicios"))
	for (var i = 0; i < ejercicios.length; i++) {

		ejercicio = ejercicios[i];
		if(i%2==0){
			row = document.createElement("div");
			$(row).addClass('row');
		}
		col=document.createElement("div");
			$(col).addClass('col-lg-12');
		
			padre= document.createElement("div");
				idPadre="t"+i.toString()+"_parent";
				$(padre).addClass('panel-group');
				$(padre).attr('id', idPadre);
					panelPrin=document.createElement("div");
						$(panelPrin).addClass('panel panel-info');
							panelHeading=document.createElement("div");
								idTarget="#tab_t"+i.toString();
								$(panelHeading).addClass('panel-heading')
								$(panelHeading).attr({
									"data-toggle": 'collapse',
									"data-target": idTarget
								});
								$(panelHeading).css('cursor', 'pointer');
									panelTitulo=document.createElement("h4");
										$(panelTitulo).addClass('panel-title');
											lista=document.createElement("ul")
												titulo=document.createElement("li")
													$(titulo).css({
														listStyleType: 'none',
														display: 'inline'
													});
													tit=document.createElement("h4")
														$(tit).html(ejercicio.titulo)
													$(titulo).append(tit)
												autor=document.createElement("li")
														$(autor).css({	
														listStyleType: 'none',
														display: 'inline'
													});	

													au=document.createElement("span")
														$(au).html(ejercicio.autor)
													$(autor).append(au)
												dificultad=document.createElement("li")
												$(dificultad).css({	
														listStyleType: 'none',
														display: 'inline'
													});	
													cont=document.createElement("span")
														dif=document.createElement("a")
															if(ejercicio.dificultad=="FACIL"){
																tipodif='btn btn-lg btn-success'
															}
															if(ejercicio.dificultad=="MEDIO"){
																tipodif='btn btn-lg btn-primary'
															}
															if(ejercicio.dificultad=="DIFICIL"){
																tipodif='btn btn-lg btn-danger'
															}
															$(dif).addClass(tipodif)


															$(dif).html(ejercicio.dificultad)
														$(cont).append(dif)
													$(dificultad).append(cont)

												ir=document.createElement("li")
												$(ir).css({	
														listStyleType: 'none',
														display: 'inline'
													});	
													derecha=document.createElement("span")
														$(derecha).addClass('pull-right clickable')
														bt=document.createElement("a")
															$(bt).addClass('btn btn-sm btn-primary')
															$(bt).attr({
																"ejercicio": i.toString(),
																"data-toggle": 'modal',
																"data-target": '#myModal'
															});

															$(bt).click(function(event) {
																resolverEjercicio( extraerEjercicio(event));
															});
															$(bt).html("ABRIR")
															icono=document.createElement("span")
																$(icono).addClass('glyphicon glyphicon-arrow-right')
															$(bt).append(icono)
														$(derecha).append(bt)
													$(ir).append(derecha)
												$(lista).append(titulo)
												$(lista).append(autor)
												$(lista).append(dificultad)
												$(lista).append(ir)
											$(panelTitulo).append(lista)
								$(panelHeading).append(panelTitulo)

							panelCuerpo=document.createElement("div")
								idCuerpo="tab_t"+i.toString()
								$(panelCuerpo).attr('id', idCuerpo);
								$(panelCuerpo).addClass('panel-collapse collapse')
								$(panelCuerpo).html(ejercicio.breve)

							panelPie=document.createElement("div")
								$(panelPie).addClass('panel-footer')
								etiquetas=ejercicio.etiquetas
								et=document.createElement("ul")
								for (var j = 0; j < etiquetas.length; j++) {
									eti=document.createElement("li")
									$(eti).css({	
														listStyleType: 'none',
														display: 'inline'
													});	
										as=document.createElement("a")
											$(as).addClass('btn btn-sm btn-default')
												sp=document.createElement("span")
													$(sp).addClass('glyphicon glyphicon-tag')
													$(sp).html(etiquetas[j])
												$(as).append(sp)
										$(eti).append(as)
									$(et).append(eti)
								}
								$(panelPie).append(et)

								progress=document.createElement("div")
									$(progress).addClass('progress')
									barra=document.createElement("div")
										$(barra).addClass("progress-bar progress-bar-info")
										mensaje=ejercicio.hecho+"% Exitos"
										$(barra).html(mensaje)
										$(barra).attr({
											role: 'progressbar',
											"aria-valuenow": ejercicio.hecho,
											"aria-valuemin": '0',
											"aria-valuemax": '100',
										});
										ancho=ejercicio.hecho+"%"
										$(barra).css('width', ancho);
									$(progress).append(barra)
								$(panelPie).append(progress)
							$(panelPrin).append(panelHeading)
							$(panelPrin).append(panelCuerpo)
							$(panelPrin).append(panelPie)
					$(padre).append(panelPrin)
			$(col).append(padre)
		$(row).append(col)
		if(i%2==1 || i== (ejercicios.length-1)){
			$(contenido).append(row)
		}
	}	
}



function extraerEjercicio(evento) {
	boton = evento.target
	indice = $(boton).attr("ejercicio")
	ejercicio = ejer[indice]
	$(".resolver").empty()
	return(ejercicio)

}


