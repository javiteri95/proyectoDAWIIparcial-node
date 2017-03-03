
  $(document).ready(function() {
    $("#dif").val($("#combo option:selected").html())
    $("#dif1").val($("#combo1 option:selected").html())
    sincronizar();
  });

  function sincronizar() {
   $("#combo").change(function(event) {
    console.log($("#combo option:selected").html());
      $("#dif").val($("#combo option:selected").html())
    });

   $("#combo1").change(function(event) {
    console.log($("#combo1 option:selected").html());
      $("#dif1").val($("#combo1 option:selected").html())
    });
  }
  






function guardar() {
  titulo = $("#inputtitulo").val();
  desc = $("#descripcion").val();
  dificultad = $("#combo option:selected").html()
  entrada = $("#inputEntrada").val();
  salidas = $("#inputSalida").val();
  hijos = $("#et").children('input')
  etiquetas = []
  for (var i = 0; i < hijos.length; i++) {
    etiquetas.push($(hijos[i]).val());
  }
  et = JSON.stringify(etiquetas)
  $.$.ajax({
    url: '/localhost:3000/ejercicios',
    type: 'POST',
    dataType: 'json',
    data: {titulo: titulo,descripcion:desc,dificultad:dificultad, datosEntrada : entrada, datosSalida: salidas, etiquetas: et},
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
  

}