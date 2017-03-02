function verifU(nombres){
    	$.ajax({
    			url: '/usuario/'+nombres,
    			type: 'GET',
			    dataType: 'json',
			    data: {nombres: nombres},
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