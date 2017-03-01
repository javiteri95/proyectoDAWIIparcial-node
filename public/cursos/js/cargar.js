function inicio(){
	var location = document.location.href;
	var data = location.split("?")
	var param = data[0]
	if (data.length == 1){
		window.location = "index.html"
	}
	else if (data.length > 1){
		param = data[1]
		window.location = "index.html?" + param;
	}
	else {
		param = data[2]
		window.location = "index.html?" + param;
	}
}

function curso(){
	var location = document.location.href;
	var data = location.split("?")
	var param = data[0]
	if (data.length == 1){
		window.location = "curso.html"
	}
	else if (data.length > 1){
		param = data[1]
		window.location = "curso.html?" + param;
	}
	else {
		param = data[2]
		window.location = "curso.html?" + param;
	}
	
}


function semana(){
	var location = document.location.href;
	var data = location.split("?")
	var param = data[0]
	if (data.length == 1){
		window.location = "semana.html"
	}
	else if (data.length > 1){
		param = data[1]
		window.location = "semana.html?" + param;
	}
	else  {
		param = data[2]
		window.location = "semana.html?" + param;
	}

}

function equipo(){
		var location = document.location.href;
	var data = location.split("?")
	var param = data[0]
	if (data.length == 1){
		window.location = "equipo.html"
	}
	else if (data.length > 1){
		param = data[1]
		window.location = "equipo.html?" + param;
	}
	else {
		param = data[2]
		window.location = "equipo.html?" + param;
	}

}

function ayudantias(){
	var location = document.location.href;
	var data = location.split("?")
	var param = data[0]
	if (data.length == 1){
		window.location = "ayudantia.html"
	}
	else if (data.length > 1){
		param = data[1]
		window.location = "ayudantia.html?" + param;
	}
	else {
		param = data[2]
		window.location = "ayudantia.html?" + param;
	}

}

function perfil(){
	var location = document.location.href;
	var data = location.split("?")
	var param = data[1]
	if (data.length > 2){
		param = data[2]
	}
	
	window.location = "perfil.html?" + param;
}

function proyectos(){
	var location = document.location.href;
	var data = location.split("?")
	var param = data[1]
	if (data.length > 2){
		param = data[2]
	}
	window.location = "proyectos.html?" + param;
}

function sandbox(){
	var location = document.location.href;
	var data = location.split("?")
	var param = data[1]
	if (data.length > 2){
		param = data[2]
	}
	var temporal = param.split("=")
	if (temporal[0]=="estudiante"){
		window.location = "sandboxE.html?" + param;
	}else{
		window.location = "sandboxP.html?" + param;
	}


}