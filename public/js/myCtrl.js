var app = angular.module("myApp",[]);
app.controller('myCtrl', function($scope) {
    $scope.Ejercicio =[{nombre:"NOMBRE", dificultad: "DIFICULTAD", descripcion:"Loreimkdknsnfd,bvsdbmnvbdv", entrada:"entrada.cnf",salida: "salidas.cnf", etiquetas: ["e1","e2"]},{nombre:"NOMBRE", dificultad: "DIFICULTAD", descripcion:"Loreimkdknsnfd,bvsdbmnvbdv", entrada:"entrada.cnf",salida: "salidas.cnf", etiquetas: ["e1","e2"]},{nombre:"NOMBRE", dificultad: "DIFICULTAD", descripcion:"Loreimkdknsnfd,bvsdbmnvbdv", entrada:"entrada.cnf",salida: "salidas.cnf", etiquetas: ["e1","e2"]}];
});
var ej= {nombre:"NOMBRE", dificultad: "DIFICULTAD", descripcion:"Loreimkdknsnfd,bvsdbmnvbdv", entrada:"entrada.cnf",salida: "salidas.cnf", etiquetas: ["e1","e2"]}
app.controller('controller', ['$scope', function ($scope) {
	$scope.Ejercicio = ej;
}]);
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