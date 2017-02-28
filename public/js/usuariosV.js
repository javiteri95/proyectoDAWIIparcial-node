


function agregarMensaje(type, message){
	if (type == "error"){
		$( "#messageZoneUsuario" ).append( "<p class='errorMessage'> " +  message + " </p>" );
    	setTimeout( "$('.errorMessage').fadeOut(1500);",3000 );
	}else{
		$( "#messageZoneUsuario" ).append( "<p class='successMessage'> " +  message + " </p>" );
    	setTimeout( "$('.successMessage').fadeOut(1500);",3000 );
	}


}


app.controller("UsuarioCtrl", function($location, $scope, $http, $rootScope) {


  $scope.editUsuario = function() {
  	console.log('este viene primero')
  	var id = $('#attrID').html();
  	var correo = $('#inputEmail2').val();
	var nombres = $('#exampleNombres2').val();
	var apellidos = $('#exampleApellidos2').val();
	var rol = $('#rol2').val();
	var tipoI = $('#tipoI2').val();
	var identificacion = $('#exampleIdentificacion2').val();
	var carrera = $('#exampleCarrera2').val();
	var dataE = { id : id , correo : correo , nombres : nombres , apellidos : apellidos , rol : rol , tipoI : tipoI , identificacion : identificacion , carrera : carrera};
	console.log(dataE);
	$.ajax({
		type: "PUT",
		url: "/usuario",
		dataType: "json",
		data: dataE,
		success: function(data){
			if (data.type == 'error'){
				agregarMensaje(data.type , 'un error ocurrio al intentar actualizar');
				$('#myModalEditar').modal('hide');

			}else{
				console.log(id);
				$( '#' + id + ' .correoTabla').html(data.usuario.correo);
				$( '#' + id + ' .nombresTabla').html(data.usuario.nombres);
				$( '#' + id + ' .apellidosTabla').html(data.usuario.apellidos);
				$( '#' + id + ' .rolTabla').html(data.usuario.rol);
				$( '#' + id + ' .tipoITabla').html(data.usuario.tipoI);
				$( '#' + id + ' .identificacionTabla').html(data.usuario.identificacion);
				$( '#' + id + ' .carreraTabla').html(data.usuario.carrera);
				agregarMensaje(data.type , 'Actualizado con exito');	
				$('#myModalEditar').modal('hide');
			}
			console.log(data);
		}
	})
  }

  $scope.agregarUsuario = function(){
  	  $http({
		  method: 'GET',
		  url: '/someUrl'
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });




  }

  $scope.eliminarUsuario = function(){
  	  $http({
		  method: 'GET',
		  url: '/someUrl'
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });




  }
});


function cargarModalAgregar(){
	$('#myModal').modal('show');
}

function cargarModalEditar(id){
	$('#attrID').html(id);

	var correo = $( '#' + id + ' .correoTabla').html();
	var nombres = $( '#' + id + ' .nombresTabla').html();
	var apellidos = $( '#' + id + ' .apellidosTabla').html();
	var rol = $( '#' + id + ' .rolTabla').html();
	var tipoI = $( '#' + id + ' .tipoITabla').html();
	var identificacion = $( '#' + id + ' .identificacionTabla').html();
	var carrera = $( '#' + id + ' .carreraTabla').html();
	

	$('#inputEmail2').val(correo);
	$('#exampleNombres2').val(nombres);
	$('#exampleApellidos2').val(apellidos);
	$('#rol2').val(rol);
	$('#tipoI2').val(tipoI);
	$('#exampleIdentificacion2').val(identificacion);
	$('#exampleCarrera2').val(carrera);

	$('#myModalEditar').modal('show');
}

function cargarModalEliminar(id){
	BootstrapDialog.show({
            title: 'Eliminar Usuario',
            message: '¿Esta seguro de eliminar este usuario?',
            type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttons: [{
		        id: 'btn-ok',   
		        icon: 'glyphicon glyphicon-check',       
		        label: 'OK',
		        cssClass: 'btn-primary', 
		        autospin: false,
		        action: function(dialogRef){    
		            console.log('has aplastado aqui');
		            $.ajax({
						type: "DELETE",
						url: "/usuario",
						dataType: "json",
						data: {id : id},
						success: function(data){
							if (data.type == 'error'){
								agregarMensaje(data.type , 'un error ocurrio al intentar eliminar');
								dialogRef.close();

							}else{
								agregarMensaje(data.type , 'Eliminado con exito');	
								$('#' + id ).remove();
								dialogRef.close();
							}
							console.log(data);
						}
					}) 
		        }
		    }]/*
            callback: function(result) {
                // result will be true if button was click, while it will be false if users close the dialog directly.
                console.log('has aplastado ok')
            }
            */
    });
}

$(document).ready(function(){
    $('#tablaUsuarios').DataTable();

});
