var app = angular.module("AngularApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/',
      controller: 'LoginCtrl'
    })
    .when('/usuario', {
      templateUrl: 'usuario',
      resolve: {
        logincheck: checkLoggedin
      }
    })
    .otherwise({
      redirectTo: '/'
    })
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer();

  $http.get('/loggedin').success(function(user) {
    $rootScope.errorMessage = null;
    //User is Authenticated
    if (user !== '0') {
      $rootScope.currentUser = user;
      deferred.resolve();
    } else { //User is not Authenticated
      $rootScope.errorMessage = 'Necesitas loguearte';
      deferred.reject();
      $location.url('/');
    }
  });
  return deferred.promise;
}


app.controller("LoginCtrl", function($location, $scope, $http, $rootScope) {


  $scope.login = function(user) {
    $http.post('/', user)
      .then(function(response) {
        $rootScope.currentUser = response;
        console.log(response)
      });
  }
});

