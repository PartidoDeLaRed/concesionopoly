ICONO_DEFAULT = "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png";

//var map;
$(document).ready(function(){
map = new GMaps({
  div: '#map',
  lat: -34.6158238,
  lng: -58.4333203,
  zoom: 12
});

lugares = []
$.ajax({ // ajax call starts
    url: 'ConcesionesDB.json', // JQuery loads serverside.php
    //data: 'button=' + $(this).val(), // Send value of the clicked button
    dataType: 'json', // Choosing a JSON datatype
  }).done(
    function hola(data){
      $.each(data, function(i, item) {

        console.log(item.Coordenadas);
        //map.setCenter(item.Coordenadas.y, item.Coordenadas.x);
        marker = map.addMarker({
                  lat: item.Coordenadas.y,
                  lng: item.Coordenadas.x,
                  title: item.Concesión,
                  icon: ICONO_DEFAULT,
                  infoWindow: {
                    content: '<p>'  + item.Concesión + item.Domicilio + ', '  + ' monton: '+ item["Monto de canon"] + '</p>'
                  }

        });
        marker.ident = i;

        mas_info = $("<div class='mas_info'></div>");
        mas_info.append($("<div>Monto de canon: " + item["Monto de canon"]+"</div>"));
        mas_info.append($("<div>Tipo de canon: " + item["Tipo de canon"]+"</div>"));
        mas_info.append($("<div>Concesionario: " + item.Concesionario+"</div>"));
        mas_info.hide();

        salida =  "<div class='lista'" + "marker_id='"+ i + "'>" + item.Concesión + "</div>";

        salida_jq = $(salida);
        salida_jq.append(mas_info);
        // $(".mas_info").hide();

        $("#list").append(salida_jq);
        lugares.push(marker);
        $('.lista').hover(function(e){
          console.log($(e.target).attr("marker_id"));
          //map.setZoom(12);
          var mark = lugares[$(e.target).attr("marker_id")];
          mark.setIcon("http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png");
          /*pos = mark.getPosition();
          map.setCenter(pos['A'], pos['F']);*/
        });
        $('.lista').on( "mouseleave", function(e){
          //map.setZoom(12);
          mark = lugares[$(e.target).attr("marker_id")];
          mark.setIcon(ICONO_DEFAULT);
          //mark.setIcon("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569");
        });

        $('.lista').on( "click", function(e){
          var target = $(e.target);

          //if( !target.find(".mas_info").is(':visible') && ! target.find(".mas_info").is(':animated')) {
            target.find(".mas_info").slideDown("slow"); // acá va un slide toogle, pero no me andaba
          //} else {
            //target.find(".mas_info").slideUp("slow"); // acá va un slide toogle, pero no me andaba
          //}
          var mark = lugares[target.attr("marker_id")];
          pos = mark.getPosition();
          map.setCenter(pos['A'], pos['F']);
          map.setZoom(15);
          mark = lugares[$(e.target).attr("marker_id")];
          mark.infoWindow.open(mark.map,mark);
          //mark.setIcon();
          //mark.setIcon("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569");
        });

      });
      //lugares[0].setIcon("http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png");
      //alert("done");
    }
)

var path = [[-34.654100, -58.528592], 
            [-34.615259, -58.530652], 
            [-34.550671, -58.501127], 
            [-34.530168, -58.454091], 
            [-34.589401, -58.358648]]; // Retiro

polygon = map.drawPolygon({
paths: path, // pre-defined polygon shape
strokeColor: '#BBD8E9',
strokeOpacity: 1,
strokeWeight: 3,
fillColor: '#BBD8E9',
fillOpacity: 0.2,
});

});
