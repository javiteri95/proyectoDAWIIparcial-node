



function iniciador(){
	var url = "data/proyects.json";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
				
				if (xhttp.readyState ==4 && xhttp.status == 200){
					//console.log(xhttp.status);
					//console.log(xhttp.response);
					var json = JSON.parse(xhttp.responseText) ;

					for (i = 0 ; i<json.length ; i++){

						
						

						$("#accordion").append(
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
											'<div class="col-xs-12 col-sm-12 col-md-12">'+
												'<div class="descripcion">'+
													'<p class="acordeon-title"> <b> Descripción</b></p> '+
													'<p class="acordeon-content"> '+ json[i].descripcion +' </p>'+
												'</div>'+
												'<hr>'+
												'<div class="fecha">'+
													'<p class="acordeon-title"> <b> Fecha</b></p> '+
													'<p class="acordeon-content"> '+ json[i].fecha +' </p>'+
												'</div>'+
												'<hr>'+
												'<div class="etiquetas">'+
													'<p class="acordeon-title"> <b> Etiquetas</b></p> '+
													'<p class="acordeon-content"> '+ json[i].etiquetas +' </p>'+
												'</div>'+
												'<hr>'+
												'<div class="archivo">'+
													'<p class="acordeon-title"> <b> Archivo</b></p> '+
													'<a href=" '+ json[i].archivo + ' "> '+ json[i].titulo + '.pdf' +' </a>'+
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
$(document).ready(function(){
	iniciador();
})

