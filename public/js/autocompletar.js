<<<<<<< Updated upstream
s$(document).ready(function(){
                /* Una vez que se cargo la pagina , llamo a todos los autocompletes y
                 * los inicializo */
                $('.autocomplete').autocomplete();
            });
       


=======
>>>>>>> Stashed changes

$(document).ready(function() {
  $( "#pro" ).autocomplete({
      source: function (req,resp) {
          $.ajax({
              url: '/cursos/profesores',
              type: 'GET',
              dataType: 'json',
              data:{q: req.term}
            })
            .done(function( data) {
              console.log(data);
              resp( data );
            });
      },
      minLength:1,
      select:function (event,ui) {
        console.log(ui.item.label);
      }
    }); 
});
