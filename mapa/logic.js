ICONO_DEFAULT = "https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0";
ICONO_HOVER = "http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png"


function safe_class_name(text){
  return text.replace(/[!\"#$%&'\(\)\*\+ ,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '');
}
function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}

function agregar_callbacks(element){
    element.mouseenter(function(e){
    // este if es para prevenir a los hijos
/*    if ($(e.target).attr("marker_id") == undefined){
      return false;
    }*/
    var target = $(e.target);
    if (target.hasClass("mas_info")){
      console.log(target.parent);
      target.parent().trigger("mouseenter");
      return;
    }
    if ($(e.target).attr("marker_id") == undefined){
      return;
    }

    console.log($(e.target).attr("marker_id"));
    //map.setZoom(12);
    var mark = lugares[$(e.target).attr("marker_id")].marker;
    mark.setIcon(ICONO_HOVER);
    /*pos = mark.getPosition();
    map.setCenter(pos['A'], pos['F']);*/
  });

  element.on( "mouseleave", function(e){
    //map.setZoom(12);
    var target = $(e.target);
    if (target.hasClass("mas_info") || target.hasClass("name_concesion") || target.hasClass("fill_space")){
      console.log(target.parent);
      target.parent().trigger("mouseleave");
      return;
    }
    if ($(e.target).attr("marker_id") == undefined){
      return;
    }
    mark = lugares[$(e.target).attr("marker_id")].marker;
    mark.setIcon(lugares[$(e.target).attr("marker_id")].icon);
    //mark.setIcon("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569");
  });

  element.on( "click", function(e){
    console.log("Entré a un marker");
    var target = $(e.target);
    if (target.is("span") || target.is("img")){
      console.log(target.parent);
      target.parent().click();
      return;
    }
    if (target.attr("marker_id") == undefined){
      return;
    }
    var to_expand = target.find(".mas_info");

    if (!to_expand.is(":visible")){
      var lugar = lugares[target.attr("marker_id")];
      var mark = lugar.marker;
      pos = mark.getPosition();
      mark.setIcon(lugar.icon);
      map.setCenter(pos['A'], pos['F']);
      map.setZoom(15);
      mark.infoWindow.open(mark.map,mark);
      marker.infoWindow.close();
      marker = mark; // temporal donde guardaremos el nodo a cerrar
      $(".gm-style-iw").parent().stop().hide().fadeIn(1500);
      window.location.hash = lugar.slug;
    
    } else{

    }

    //mark.setIcon();
    //mark.setIcon("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569");
    to_expand.slideToggle("slow"); // acá va un slide toogle, pero no me andaba
  });
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
  var lugares_hash = new Object(); // or just {}
  item_list = $("#items");
  $.ajax({ // ajax call starts
      url: 'ConcesionesDB.json', // JQuery loads serverside.php
      //data: 'button=' + $(this).val(), // Send value of the clicked button
      dataType: 'json', // Choosing a JSON datatype
    }).done(
      function hola(data){
        $.each(data, function(i, item) {
          var lugar = new Lugar(item["Monto de canon"], safe_class_name(item["Rubro"]));

          //console.log(item.Coordenadas);
          mas_info = $("<div class='mas_info'></div>");
          mas_info.append($("<div class='fields'> <span class='field_name'> <span class='texto_field'> Concesión: </span></span> <span class='field_data'>" + item["Concesión"]+"</span></div>"));
          mas_info.append($("<div class='fields'> <span class='field_name'> <span class='texto_field'> Concesionario: </span></span> <span class='field_data'>" + item.Concesionario+"</span></div>"));
          mas_info.append($("<div class='fields'> <span class='field_name'> <span class='texto_field'> Monto de canon: </span></span> <span class='field_data'>$" + item["Monto de canon"]+"</span></div>"));
          mas_info.append($("<div class='fields'> <span class='field_name'> <span class='texto_field'> Tipo de canon: </span></span> <span class='field_data'>" + item["Tipo de canon"]+"</span></div>"));
          mas_info.append($("<div class='fields'> <span class='field_name'> <span class='texto_field'> Domicilio: </span></span> <span class='field_data'>" + item["Domicilio"]+"</span></div>"));
          mas_info.append($("<div class='fields'> <span class='field_name'> <span class='texto_field'> Rubro: </span></span> <span class='field_data'>" + item["Rubro"]+"</span></div>"));
          mas_info.append($("<div class='fields'> <span class='field_name'> <span class='texto_field'> Vencimiento: </span></span> <span class='field_data'>" + item["Vencimiento"]+"</span></div>"));
          mas_info.append($("<div class='fields'> <span class='field_name'> <span class='texto_field'> Normativa: </span></span> <span class='field_data'>" + item["Normativa aplicable/concesiones"]+"</span></div>"));

          salida =  "<div class='lista'" + "marker_id='"+ i + "'> <span class='name_concesion'>" + item.Concesión.toUpperCase() + "</span></div>";

          salida_jq = $(salida);
          var new_div = $('<div></div>'); // deberíá googlear como se hace esto
          new_div.addClass('fill_space');
          new_div.append($(new Image()).attr('src', '' + lugar.icon).addClass('imagen_concesion'))
          salida_jq.prepend(new_div);
          salida_jq.addClass(safe_class_name(item["Rubro"]));
          salida_jq.append(mas_info);
          var share_text = encodeURIComponent(item["Concesión"]+ " Paga $"+item["Monto de canon"] + " por mes a la ciudad, más info en: " +window.location.href);
          mas_info.append($("<a href='https://twitter.com/intent/tweet?related=PartidodelaRed&text=" + share_text + "'>Tweet</a>"));
          //var url = window.location.href;
          /*var url = "www.concesionopoly.com";

          var fb_text = encodeURIComponent("http://queproponen.com.ar/caba/propuestas/&picture=http:%2F%2Fqueproponen.com.ar%2Fvosquepropones%2FIMG%2FshareLogo.png&name=Todas%20las%20propuestas%20de%20los%20candidatos%20para%20CABA%20en%20un%20solo%20lugar&caption=via%20queproponen.com.ar%20-%20Partido%20de%20la%20Red&description=Conocé%20todas%20las%20propuestas%20de%20los%20candidatos%20a%20Gobernador%20de%20CABA%20y%20discutilas%20directamente%20con%20los%20ellos.&redirect_uri=http://queproponen.com.ar/caba/propuestas/close.html&display=popup");
          mas_info.append($("<a href='https://facebook.com/dialog/feed?app_id=825676227513877&link="+fb_text+ "'>Compartir</a>"));*/

          mas_info.hide();
          rubros[item.Rubro] = 1; // identificador para que agarre la clave

          marker = map.addMarker({
                    lat: item.Coordenadas.y,
                    lng: item.Coordenadas.x,
                    title: item.Concesión,
                    icon: lugar.icon,
                    infoWindow: {
                      content: mas_info.html()
                    }

          });

          lugar.marker = marker;
          lugar.slug = convertToSlug(item["Concesión"]);
          lugares_hash[lugar.slug] = lugar;
          marker.ident = i;

          item_list.append(salida_jq);
          
          lugares.push(lugar);


          agregar_callbacks(salida_jq);

        });
        lista_rubros = Object.keys(rubros).sort();

        var selector = $("#selector");
        for (var rubro in lista_rubros){
          var nombre_rubro = lista_rubros[rubro];
          if (nombre_rubro == "#N/A"){
            nombre_rubro = "SIN CATEGORÍA"
          }

          selector.append($('<option>', {
            value: safe_class_name(nombre_rubro),
            text: nombre_rubro
          }));
        };

        selector.change(function () {
          if (selector.val() == "todos"){
            $(".lista").show();
            var ver_todos = true;
          } else {
            $(".lista").hide();
            console.log(selector.val());
            $("." + selector.val()).show();
            var ver_todos = false;
          }

          for (var lugar in lugares){
            lugares[lugar].marker.setVisible(lugares[lugar].rubro == selector.val() || ver_todos);
          }
        })

        var selector2 = $("#selector_orden");
        selector2.change(function () {
          to_append = $(".lista");
          if (selector2.val() == "Mm"){
            // Mayor a menor
            to_append.sort(function(a,b){
              precio1 = lugares[$(a).attr("marker_id")].monto;
              precio2 = lugares[$(b).attr("marker_id")].monto;
              if (precio1<precio2){
                return 1;
              }
              if (precio1>precio2){
                return -1;
              }
              return 0;
            })
            
          } else {
            // menor a mayor
            to_append.sort(function(a,b){
              precio1 = lugares[$(a).attr("marker_id")].monto;
              precio2 = lugares[$(b).attr("marker_id")].monto;
              if (precio1<precio2){
                return -1;
              }
              if (precio1>precio2){
                return 1;
              }
              return 0;
            })
          }
            $("#items").empty();
            agregar_callbacks(to_append);
            $("#items").html(to_append);
        })
        
        if (window.location.hash){
          console.log(lugares_hash);
          var lugar = lugares_hash[window.location.hash.replace('#', '')];
          var mark = lugar.marker;
          pos = mark.getPosition();
          mark.setIcon(lugar.icon);
          map.setCenter(pos['A'], pos['F']);
          map.setZoom(15);
          mark.infoWindow.open(mark.map,mark);
          marker = mark;
        }



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


              [-34.626784, -58.334295],
              [-34.633564, -58.351290],
              [-34.644298, -58.357641],
              [-34.654748, -58.372748],
              [-34.662796, -58.393690],
              [-34.658560, -58.412230],
              [-34.665620, -58.428366], // donde empeza la parte irregular en la boca
              //[-34.658984, -58.413431],
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
