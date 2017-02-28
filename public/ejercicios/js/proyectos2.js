

function lectorPanel(){

	
	var url = "data/proyects.json";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState ==4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText) ;
			var size = json.length



			var titulo = $("#tituloModal").val()
			var descripcion = $("#descripcionModal").val()
			var etiquetas = $("#etiquetasModal").val()
			var fecha = $("#fechaModal").val()
			//var archivo $("#inputFile").val()
			var timeActual = Date.now()

			if (fecha!=""){
				var fechaS=fecha.split("-");
				//2016-12-07
				var comprobador =fechaS[1]+"/"+fechaS[2]+"/"+fechaS[0];
				fechaTimestamp = new Date(comprobador)
			}

			if ((titulo=="")||(descripcion=="")||(etiquetas=="")||(fecha=="")){
				$(".oculto").text("no ha llenado todos los campos")

			}
			else if (timeActual > fechaTimestamp){
				$(".oculto").text("la fecha definida para la entrega ya paso !!")
			}
			else{

						$("#accordion").append(
							'<div class="panel panel-default name="' + size+1 + '">' + 
								'<div class="panel-heading" role="tab" id="heading' + i + '">' + 
									'<h4 class="panel-title ">' + 
										'<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+ size+1 +'" aria-expanded="false" aria-controls="collapse'+ i + '">'+
											titulo + 
										'</a>' + 
									'</h4>' + 
								'</div>' +  
								'<div id="collapse'+ i + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+ i +'">' + 
									'<div class="panel-body">'+
										'<div class="row">'+
											'<div class="col-xs-12 col-sm-12 col-md-12">'+
												'<div class="descripcion">'+
													'<p class="acordeon-title"> <b> Descripción</b></p> '+
													'<p class="acordeon-content"> '+ descripcion +' </p>'+
												'</div>'+
												'<hr>'+
												'<div class="fecha">'+
													'<p class="acordeon-title"> <b> Fecha</b></p> '+
													'<p class="acordeon-content"> '+ fecha +' </p>'+
												'</div>'+
												'<hr>'+
												'<div class="etiquetas">'+
													'<p class="acordeon-title"> <b> Etiquetas</b></p> '+
													'<p class="acordeon-content"> '+ etiquetas +' </p>'+
												'</div>'+
												'<hr>'+
												'<div class="archivo">'+
													'<p class="acordeon-title"> <b> Archivo</b></p> '+
													'<a href=" '+ '#' + ' "> '+ titulo + '.pdf' +' </a>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>' + 
								'</div>' +
							'</div>'

						)
				
				$('#myModal').modal('hide');
				$('#myModal').on('hidden.bs.modal', function (e) {
  					$(".oculto").text("")
				})

			}



		}


	}
	xhttp.open("GET", url);
	xhttp.send();

}
