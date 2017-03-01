$(document).ready(function() {
   llenarAyudantes();
   $(".video-link a").click(function(event) {
         seleccionado = event.target
         if($(seleccionado).attr('href')=="#horario-popup"){
               console.log($(seleccionado).html())
            //$("#horario-popup").append()
         }

   });
});


function llenarAyudantes(){
   
   var url = "data/AYUDANTES.json";
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function(){
            
            if (xhttp.readyState ==4 && xhttp.status == 200){
               //console.log(xhttp.status);
               //console.log(xhttp.response);
               var json = JSON.parse(xhttp.responseText) ;
               console.log($(".pricing-tables.block-1-4.group").html())

               for (i = 0 ; i<json.length-1 ; i++){
                img=i%3+1
                   $(".pricing-tables.block-1-2.group").append(
                "              <div class=\"bgrid\"> "

         +   "   <div class=\"price-block\">"

                 +" <div class=\"top-part\"> "
                 
                  +"   <h3 class=\"plan-title\">Ayudante</h3>"
                  +  " <p class=\"plan-price\">"+json[i].nombre+"</p>"
                  +  " <p class=\"price-month\">"+"correo@espol.edu.ec"+"</p>"
                  +                    "                </div>                "

                +   "<div class=\"bottom-part\">"
                 +  "<ul class=\"features\"><li><img style=\"border-radius: 50%;\" src=\"images/avatars/avatar-"+img.toString()+".jpg\"></li>"
                  + "<li><div class=\'video-link\'>"
                   +        "<a href=\"#horario-popup\" class=\"button large\"> Ver Horario </a></li>"
                    +    "</ul></div>"
                     
                 + "</div>"
        +      " </div>   "         
                        
        +    "</div>")  


               }           
            }
         }
         
         xhttp.open("GET", url);
         xhttp.send();
}




/*

<div class="bgrid"> 

               <div class="price-block">

                  <div class="top-part">

                     <h3 class="plan-title">Ayudante</h3>
                     <p class="plan-price">Annie Santacruz</p>
                     <p class="price-month">correo@espol.edu.ec</p>
                     <!-- <p class="price-meta">Billed Annually.</p> -->

                  </div>                

                  <div class="bottom-part">
                   <img src="images/avatars/avatar-1.jpg">
                        <div class='video-link'>
                           <a href="#horario-popup" class="button large" href="#">Ver Horario</a>
                        </div>
                     
                  </div>

               </div>            
                        
            </div> <!-- /price-block -->*/