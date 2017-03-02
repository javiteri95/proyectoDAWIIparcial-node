function verifU(nombres){
    	$.ajax({
    			url: '/usuario/nombre/'+nombres,
    			type: 'GET',
			    dataType: 'json',
			    data: {nombres: nombres},
    		})
    		 .done(function(resp) {
    		 	console.log(resp);
		      if(resp.usuario==""){
		      	console.log("no sirve");
		      	return false;
		      }else{
		      	console.log("si sirve");
		      	return true;
		      }
		      
		    })
		    .fail(function(resp) {
		      console.log("error");
		      console.log(resp);
		      return false;
		    })
}