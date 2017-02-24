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
  var correo = $('#inputCorreo').val();
  var oldPassword = $('').val();
  var newPassword1 = $('').val();
  var newPassword2 = $('').val();

  $.post('/cambio', { correo: correo, oldPassword : oldPassword , newPassword : newPassword1}, 
    function(data){
         console.log(data);

  }, "json");
}

