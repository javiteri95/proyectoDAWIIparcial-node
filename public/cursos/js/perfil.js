
function iniciador( email){
	var url = "data/data.json"
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState ==4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			for (i = 0; i< json.length ; i++){
				if (email == json[i].email){

					var nombreJson = json[i].name
					var correoJson = json[i].email
					var birthdayJson = json[i].birthday
					var ejercicios = json[i].ejercicios
					var nivel = json[i].nivel
					var imagen = json[i].imagen
					var tipo = json[i].type
					var label = "resueltos"
					if (tipo == "profesor" ){
						label = "propuestos"
					}

					$(".perfil").append(
						'<div align="center">' + 
							'<img src="' + imagen+ '" class="img-responsive img-circle">'+
						'</div>'+
						'<div>'+
							'<h2>' + nombreJson + '</h2>'+
						'</div>'+
						'<div>'+
							'<table>'+
								'<tbody>'+
									'<tr>'+
										'<td class="title">Correo Electrónico:</td>'+
										'<td><a href="mailto:' + correoJson + '">' + correoJson +'</a></td>'+
									'</tr>'+
									'<tr>'+
										'<td class="title">Fecha de Nacimiento</td>'+
										'<td>' + birthdayJson + '</td>'+
									'</tr>'+
									'<tr>'+
										'<td class="title">Ejercicios ' + label + '</td>'+
										'<td>' + ejercicios+ '</td>'+
										'</tr>'+
									'<tr>'+
										'<td class="title">Nivel</td>'+
										'<td>' + nivel + '</td>'+
									'</tr>'+
								'</tbody>'+
							'</table>'+
						'</div>'
					)
					break;
				}

			}
		}

	}

	xhttp.open("GET", url);
	xhttp.send();
}

function obtenedor(){
	var locacion = document.location.href
	var lugar = locacion.split("=")
	var nombre = lugar[1]
	return nombre;
}



$(document).ready(function(){
	var nombre = obtenedor()
	iniciador(nombre);
})
