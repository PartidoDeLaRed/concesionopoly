ICONO_DEFAULT = "https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0";

 function safe_class_name(text){
  return text.replace(/[!\"#$%&'\(\)\*\+ ,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '');
}

//var map;
$(document).ready(function(){
  map = new GMaps({
    div: '#map',
    lat: -34.6158238,
    lng: -58.4333203,
    zoom: 12
  });

  lugares = []
  var rubros = new Object(); // or just {}
  $.ajax({ // ajax call starts
      url: 'ConcesionesDB.json', // JQuery loads serverside.php
      //data: 'button=' + $(this).val(), // Send value of the clicked button
      dataType: 'json', // Choosing a JSON datatype
    }).done(
      function hola(data){
        $.each(data, function(i, item) {

          //console.log(item.Coordenadas);
          mas_info = $("<div class='mas_info'></div>");
          mas_info.append($("<div>Concesión: " + item["Concesión"]+"</div>"));
          mas_info.append($("<div>Concesionario: " + item.Concesionario+"</div>"));
          mas_info.append($("<div>Monto de canon: " + item["Monto de canon"]+"</div>"));
          mas_info.append($("<div>Tipo de canon: " + item["Tipo de canon"]+"</div>"));
          mas_info.append($("<div>Domicilio: " + item["Domicilio"]+"</div>"));
          mas_info.append($("<div>Rubro: " + item["Rubro"]+"</div>"));
          mas_info.append($("<div>Vencimiento: " + item["Vencimiento"]+"</div>"));
          mas_info.append($("<div>Normativa: " + item["Normativa aplicable/concesiones"]+"</div>"));

          salida =  "<div class='lista'" + "marker_id='"+ i + "'>" + item.Concesión + "</div>";

          salida_jq = $(salida);
          salida_jq.addClass(safe_class_name(item["Rubro"]));
          salida_jq.append(mas_info);
          rubros[item.Rubro] = 1; // identificador para que agarre la clave
          marker = map.addMarker({
                    lat: item.Coordenadas.y,
                    lng: item.Coordenadas.x,
                    title: item.Concesión,
                    icon: ICONO_DEFAULT,
                    infoWindow: {
                      content: mas_info.html()
                    }

          });
          mas_info.hide();
          marker.ident = i;

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
            target.find(".mas_info").slideDown("slow"); // acá va un slide toogle, pero no me andaba

/*            if (target.find(".mas_info").style.display == "none") {

              target.find(".mas_info").slideDown("slow"); // acá va un slide toogle, pero no me andaba
            } else {
              target.find(".mas_info").slideUp("slow"); // acá va un slide toogle, pero no me andaba
            }*/
            var mark = lugares[target.attr("marker_id")];
            pos = mark.getPosition();
            mark.setIcon(ICONO_DEFAULT);
            map.setCenter(pos['A'], pos['F']);
            map.setZoom(15);
            mark = lugares[$(e.target).attr("marker_id")];
            mark.infoWindow.open(mark.map,mark);
            //mark.setIcon();
            //mark.setIcon("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569");
          });

        });
        lista_rubros = Object.keys(rubros);

        var selector = $("#selector");
        for (var rubro in lista_rubros){
          selector.append($('<option>', {
            value: safe_class_name(lista_rubros[rubro]),
            text: lista_rubros[rubro]
          }));
        };

        selector.change(function () {
          if (selector.val() == "todos"){
            $(".lista").show();
          } else {
            $(".lista").hide();
            console.log(selector.val());
            $("." + selector.val()).show();
          }
        })



        //lugares[0].setIcon("http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png");
        //alert("done");
      }
  )

  var path = [
              [-34.705249, -58.460896], // punta abajo a la izquierda
              [-34.654100, -58.528592], 
              [-34.615259, -58.530652], 
              [-34.550671, -58.501127], 
              [-34.530168, -58.454091], 
              [-34.589401, -58.358648],
              [-34.659902, -58.417637], // donde empeza la parte irregular en la boca
              ]; // Retiro

  polygon = map.drawPolygon({
  paths: path, // pre-defined polygon shape
  strokeColor: '#BBD8E9',
  strokeOpacity: 1,
  strokeWeight: 3,
  fillColor: '#BBD8E9',
  fillOpacity: 0.2,
  });

});
