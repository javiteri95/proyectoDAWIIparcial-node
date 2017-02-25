
function cargarEjercicios(dificultad) {
  var acordion = $("#accordion")
  $.$.ajax({
    url: 'localhost:3000/ejercicios/'+dificultad,
    type: 'GET',
    dataType: 'json',
    data: {},
  })
  .done(function(resp) {
    contenedo = $(".contenedor")
    $(accordion).empty();
    listaEjercicios = resp;

      var paneldef = document.createElement("div");
      var panelHead = document.createElement("div");
      var titulo = document.createElement("h4");
      var tit = document.createElement("a");
      var collapse = document.createElement("div");
      var cuerpo = document.createElement("div");
      var footer = document.createElement("div");
      var lista = document.createElement("ul");
      var desc = document.creatElemet("p")
      $(paneldef).addClass('panel panel-default')
      $(paneldef).attr({
        "idEjercicio": listaEjercicios[i].__id,
        "id": 'ejer'+i
      });
      $(panelHead).addClass('panel-heading');
      $(titulo).addClass('panel-title');
      $(tit).attr({
        "data-toggle": 'collapse',
        "data-parent": '#accordion',
        "href":'#collapse'+i
      });
      $(collapse).addClass('panel-collapse collapse in')
      $(collapse).attr('id', 'collapse'+i);
      $(cuerpo).addClass('panel-body');
      $(footer).addClass('panel-footer')
      $(tit).html(listaEjercicios[i].titulo+" - "+listaEjercicios[i].dificultad);
      $(tit).appendTo(titulo)
      $(titulo).appendTo(panelHead)


      $(desc).html(listaEjercicios[i].descripcion);
      $(lista).addClass('list-group')
      labE = document.createElement("h3")
      $(labE).html("Datos entrada");
      lE = document.createElement("a")
      $(lE).attr('href',listaEjercicios[i].datosEntrada );
      $(lE).html("Entradas.txt")
      labS = document.createElement("h3")
      $(labS).html("Datos salida");
      lS = document.createElement("a")
      $(lS).attr('href',listaEjercicios[i].datosSalida );
      $(lS).html("Salidas.txt")
      etiquetas = listaEjercicios[i].etiquetas;
      for (var i = 0; i < etiquetas.length; i++) {
           item = document.createElement("li");
           $(item).addClass('list-group-item')
           $(item).html(etiquetas[i])
           $(lista).append(item)
      }

      $(footer).append(lista);
      $(cuerpo).append(desc)
      $(cuerpo).append(labE)
      $(cuerpo).append(lE)
      $(cuerpo).append(labS)
      $(cuerpo).append(lS)
      $(collapse).append(cuerpo)
      $(collapse).append(footer)
      $(paneldef).append(panelHead)
      $(paneldef).append(collapse)
      $(paneldef).appendTo(accordion)
    
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
}

