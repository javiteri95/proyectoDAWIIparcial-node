


app.controller("LoginCtrl", function($scope, $http, $rootScope) {


  $scope.login = function(user) {
    $http.post('/', user)
      .then(function(response) {
        $rootScope.currentUser = response;
        console.log(response)
      });
  }


});




$(document).ready(function(){
        $('.log-btn').click(function(){
            $('.log-status').addClass('wrong-entry');
           $('.alert').fadeIn(500);
           setTimeout( "$('.alert').fadeOut(1500);",3000 );
        });
        $('.form-control').keypress(function(){
            $('.log-status').removeClass('wrong-entry');
        });

});

function cambioPassword(){
  $('#messageZone2').empty();
  var correo = $('#inputCorreo').val();
  var oldPassword = $('#oldPassword').val();
  var newPassword1 = $('#newPassword1').val();
  var newPassword2 = $('#newPassword2').val();
  console.log(newPassword1)
  console.log(newPassword2)

  if (newPassword1 != newPassword2){
    $( "#messageZone2" ).append( "<p class='errorMessage'> ambas contraseñas nuevas no coinciden ! </p>"  );
    setTimeout( "$('.errorMessage').fadeOut(1500);",3000 );
  }
  else{
    $.post('/cambio', { correo: correo, oldPassword : oldPassword , newPassword : newPassword1}, 
    function(data){
      if (data.type == "error"){
        $( "#messageZone2" ).append( "<p class='errorMessage'> " +  data.message + " </p>" );
        setTimeout( "$('.errorMessage').fadeOut(1500);",3000 );
      }
      else{
        
        $( "#messageZone2" ).append( "<p class='successMessage'> " +  data.message + " </p>" );

        setTimeout(function() {
          $('#myModal').modal('hide');
          $('.successMessage').fadeOut(1500)

        }, 2000);
        
      }
    }, "json");

  }

}

