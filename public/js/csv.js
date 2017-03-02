$(document).ready(function(){
  var d=$("#direccion").html();
  if ((d!="")&&(d!="error")) {
   // csv(d);
  }
  $('#entradas').change(handleFileSelect)
  $('#subir').prop('disabled',true);

});
  function handleFileSelect(evt) {
    var files = evt.target.files;
    console.log(files)
    if (files.length==0){ output.push('<li><strong style="color: red;">', "No hay archivos", '</strong></li>');}
   else{
     // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    console.log(files);
    var f=files[0];

    var format = f.name.split(".");
  if(format[1] === "csv"){
    $('#subir').removeAttr('disabled');
     output.push('<li><strong>', f.name, '</strong> (csv) </li>');
      }
      else{
     output.push('<li><strong style="color: red;">', "El formato debe ser csv", '</strong></li>');
    } 
  }
      
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }
function csv(d){
   $.ajax({
  url: ''+d,
  dataType: 'text',
}).done(function(data){
  successFunction(data);
})
}
function successFunction(data) {
  var allRows = data.split('/\r\n|\r|\n/');
  for (var i = 0; i < allRows.length; i++) {
    curso = allRows[i].split(";")
    if(/([A-Z]([a-z]+))+/.test(curso[0])){
      profesor=curso[0]
    }
    if((/[0-9]+/.test(para))){
    paralelo= parseInt(curso[1])}
    estudiantes = curso[2].split(',')
    estudiante=[]
    for (var i = 0; i < estudiantes.length; i++) {
      if (/([A-Z]([a-z]+))/.test($(estudiantes[i]))) {
      estudiante.push(estudiantes[i])
      }
    }
    agregarC(profesor,paralelo,estudiante);
  }
  
}
function agregarC(prof,para,est){
  $(".err").remove();
  
    
  console.log(est);
  $.ajax({
          url: '/cursos/paralelo/'+para,
          type: 'GET',
          dataType: 'json',
          data: {paralelo: para},
        })
         .done(function(resp) {
          console.log("success");
          console.log(resp);
          var error=document.createElement("span");
        $(error).css('color','red');
        $(error).html("El paralelo ya existe");
        $(error).addClass("col-lg-10");
        $(error).addClass("err");
        $(error).css('margin-left','0px');
        $(error).css('float','left');
        var br=document.createElement("br");
        $("#llenar").append(br);
        $("#llenar").append(error);
        })
        .fail(function(resp) {
          console.log("error");
          console.log(resp);
          if(!($.isEmptyObject(est))){
         $.ajax({
            url: '/cursos/agregar',
            type: 'POST',
            dataType: 'html',
            data: {profesor: prof, paralelo: para, estudiantes: JSON.stringify(est)},
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
        console.log("agregando");
        $("body").removeClass('modal-open');
          $("#myModal").removeClass('in');
          $("#myModal").css('display', 'none');
        $(".modal-backdrop").remove();
        tomar();
      }
      else{
        var errmesg=error();
        var br=document.createElement("br");
        $("#llenar").append(br);
        $("#llenar").append(errmesg);
      }
        })
        .always(function() {
          console.log("complete");
    });
    }
  else{
    var errmesg=error();
    var br=document.createElement("br");
    $("#llenar").append(br);
    $("#llenar").append(errmesg);
  }
}