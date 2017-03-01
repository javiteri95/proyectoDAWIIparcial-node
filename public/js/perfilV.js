$(document).ready(function(){
    //$('#buttonQuemar').on("click", quemaValores());

});

function quemaValores(){
	$.get( "/perfil/quemar", function( data ) {
		console.log(data);
	});
}