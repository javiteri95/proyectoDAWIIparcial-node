$(document).ready(function() {
  $("#submit").disabled=true
  if($("#hide").html() != ""){
      $("#submit").disabled=false
  }else{
      $("#submit").disabled=true
  }

  $("#respuesta").change(function(event) {
    if($("#respuesta").val()!=""){
      $("#submit").disabled=false
    }else{
      $("#submit").disabled=true
    }
  });
}); 












