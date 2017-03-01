
$(document).ready(function(){
  $("#map").click(function (e) {
       
        edificio={}
        edificio.nombre= $(e.target).html();
        edificio.lat="-2.1481404";
        edificio.long="-79.9666825";
        initializeMap(edificio.lat,edificio.long);
        
        //initializeMap();
    });
	
	});
//}	

//)
function initializeMap(lat,lon) {
         console.log('Ingreso a mapa')
      var la= parseFloat(lat)
      var long= parseFloat(lon)
        var mapOptions = {
            center: new google.maps.LatLng(la, long),
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        $("#map-popup").css('heigth', '50vh');
        var map = new google.maps.Map(document.getElementById("map-popup"),
          mapOptions);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(la, long)
        });
        marker.setMap(map);
    }

    //show map on modal

    