var app = angular.module("myApp",[]);
app.controller('myCtrl',[ '$scope',"$http",function($scope, $http) {
	$http({
  method: 'GET',
  url: '/ejercicios/api/TODOS'
}).then(function successCallback(response) {
	var ejercicios = response.data;
	console.log(ejercicios);
	Ejercicios = []
    for (var i = 0; i < ejercicios.length; i++) {

    	et = ejercicios[i].etiquetas.split(",")
    	Ejercicios.push({id: ejercicios[i]._id,nombre: ejercicios[i].titulo, dificultad: ejercicios[i].dificultad, descripcion: ejercicios[i].descripcion, entrada: ejercicios[i].datosEntrada, salida: ejercicios[i].datosSalida, etiquetas: et})
    	
    }
    $scope.Ejercicio = Ejercicios
    $scope.message = "EJERCICIOS DE FUNDAMENTOS";
    $scope.ver = false;
	$scope.nver = true;    
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
    

	$scope.cargar = function (value) {
		if(value =='todos'){
			msg = "EJERCICIOS DE FUNDAMENTOS"
			URI = '/ejercicios/api/todos'
			bol = false
		}
		else{
				msg = "MIS EJERCICIOS DE FUNDAMENTOS"
				URI = '/ejercicios/api/'
				bol = true
		}
 $scope.ver = bol
 $scope.nver = !bol
 $scope.message = msg;
		$http({
  method: 'GET',
  url: URI
}).then(function successCallback(response) {
	var ejercicios = response.data;
	console.log(ejercicios);
	Ejercicios = []
    for (var i = 0; i < ejercicios.length; i++) {

    	et = ejercicios[i].etiquetas.split(",")
    	Ejercicios.push({id: ejercicios[i]._id, nombre: ejercicios[i].titulo, dificultad: ejercicios[i].dificultad, descripcion: ejercicios[i].descripcion, entrada: ejercicios[i].datosEntrada, salida: ejercicios[i].datosSalida, etiquetas: et})
    	
    }
    $scope.Ejercicio = Ejercicios
    console.log($scope.ver);
    return $scope
    
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
}


	$scope.eliminar =function (value) {
		$http.delete('/ejercicios/'+value).then($scope.cargar("Mis ejecicios"), $scope.cargar("Mis ejecicios"))
	}



	$scope.editar = function (value) {
		$("#tit").val(value.nombre)
		$("#des").val(value.descripcion)
		es = ""
		value.etiquetas.forEach(function (et) {
			es += et+","
		})

		$("#ets").val(es.slice(0, -1))
		$("#identificacion").val(value.id)
	}


}]);




app.controller('controller', ['$scope',"$http", function ($scope,$http) {
	dificultadCombo = $("#dif");

	$("#saltar").click(function(event) {
		getEjercicios($scope,$http);
	});

	$(dificultadCombo).change(function(event) {
		getEjercicios($scope,$http);
	});

	
}]);


app.controller('controllers', ['$scope',"$http", function ($scope,$http) {
	$scope.nverE = true;
	$scope.verE = false;
	$scope.verS = false;
	$scope.nverS = true;
	$("#checkedE").change(function(event) {
		console.log("EE");
		$scope.verE = $scope.checkedE
		$scope.nverE = !$scope.checkedE
	});
	$("#checkedS").change(function(event) {
		console.log("SS")
		$scope.verS = $scope.checkedS
		$scope.nverS = !$scope.checkedS
	});



	
}]);






function getEjercicios($scope,$http) {
	dif = $("#dif option:selected").html();
		if(dif != "Selecccione una Díficultad" ){
			console.log('/ejercicios/api/'+ dif);
			$http({
				  method: 'GET',
				  url: '/ejercicios/api/'+ dif
				}).then(function successCallback(response) {
					var ejercicios = response.data;
					tamaño = ejercicios.length;
					indice = Math.floor(Math.random() * tamaño);
					Ejercicio = ejercicios[indice];
					//Ejercicios = []
				    
					console.log(Ejercicio.dificultad);
				    console.log(Ejercicio._id);
				    console.log(Ejercicio);
				    
				   	et = Ejercicio.etiquetas.split(",")
				    	
				    
				    $scope.Ejercicio = {_id: Ejercicio._id ,nombre: Ejercicio.titulo, dificultad: Ejercicio.dificultad, descripcion: Ejercicio.descripcion, entrada: Ejercicio.datosEntrada, salida: Ejercicio.datosSalida, etiquetas: et};
				    $('#en').val(Ejercicio.datosEntrada);
				    $('#sa').val(Ejercicio.datosSalida);
				    $('#dife').val(Ejercicio.dificultad);
				    $('#idE').val(Ejercicio._id);
				  }, function errorCallback(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
		}
}





/*
app.controller("HomeCtrl", ['$scope','upload',function ($scope,upload) {
	$scope.uploadFile = function(){
		var titulo = $scope.titulo;
		var desc = $scope.descripcion;
		var eFile = $scope.entradas;
		var sFile = $scope.salidas;
		var et = $scope.etiquetas;
		var dif = $scope.dificultad;
		et = et.split(",");
		upload.uploadFile(titulo,desc,eFile,sFile,et,dif).then(function (res) {
			console.log(res);
		})
	}
}]);

app.directive('uploaderModel', ['$parse',function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			iElemt.on('change', function(event) {
				console.log(scope,iElement[0].files[0]);
				$parse(iAttrs.uploaderModel).assign(scope,iElement[0].files[0]);
			});
		}
	};
}]);

app.service('upload', ['$http','$q', function($http,$q){
	this.uploadFile = function (titulo,desc,eFile,sFile,et,dif) {
		var defered = $q.defer();
		var formData = new FormData();
		formData.append('titulo',titulo)
		formData.append('descripcion',desc)
		formData.append('datosEntrada',eFile)
		formData.append('datosSalida',sFile)
		formData.append('etiquetas',et)
		formData.append('dificultad',dif)
		return $http.$.post('localhost:3000/ejercicios', formData, {
			headers: {
				"Content-type": undefined
			},
			transformRequest:formData
		})
		.succes(function (res) {
			console.log("llego");
		})
		.error(function(msg,code) {
			deferred.reject(msg)
		});
		return deferred.promise;
	}
}])*/