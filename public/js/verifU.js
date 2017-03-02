function verifU(nombres,apellidos){
    	$.ajax({
    			url: '/usuario/'+nombres+'/'+apellidos,
    			type: 'GET',
			    dataType: 'json',
			    data: {nombres: nombres,apellidos:apellidos},
    		})
    		 .done(function(resp) {
		      console.log("success");
		      console.log(resp);
		      return true;
		    })
		    .fail(function(resp) {
		      console.log("error");
		      console.log(resp);
		      return false;
		    })
		    .always(function() {
		      console.log("complete");
		});
}