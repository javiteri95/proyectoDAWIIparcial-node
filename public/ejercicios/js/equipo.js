$.get('js/profesores.json', function(data) {

  $.each(data, function(i, profesor) {
    var cargo = profesor.cargo;
    var $div = $('<div class="col-sm-4 col-md-3">');
    var $thum = $('<div class="thumbnail">');
    var $image = $('<img/>').attr("src", profesor.foto);
    var $caption = $('<div class="caption"/>');
    $caption.append($('<h3/>').text(profesor.nombre))
      .append($('<h5/>').text(profesor.cargo))
      .append($('<h5/>').text(profesor.mail))
      .append($('<h5/>').text(profesor.telefono));
    $thum.append($image, $caption);
    $div.append($thum);
    if (cargo.length > 1) {
      $("#Coordinador").append($div);
    } else {
      $("#profesores").append($div);
    }
  });
});
