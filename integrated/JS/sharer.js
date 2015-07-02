


function CompartirInicio(tipo){
  if(tipo == 0)
    window.open('https://twitter.com/intent/tweet?'+
    'related=PartidodelaRed&'+
    'text='+ 'Conocé todas las concesiones otorgadas por la Ciudad de Buenos Aires. 23concesionopoly'+ location.origin+location.pathname, 'tweet', 'width=900,height=300,menubar=no,status=no,titlebar=no,top=200,left='+(screen.width-900)/2);
  else
    window.open('http://www.facebook.com/dialog/feed?app_id=1596481937283116' +
        '&link='+location.origin+location.pathname +
        //'&picture=http:%2F%2Fqueproponen.com.ar%2Fvosquepropones%2FIMG%2FshareLogo.png' +
        '&name=' + 'Conocé todas las concesiones otorgadas por la Ciudad de Buenos Aires. ' +
        '&caption=' + 'via concesionopoly.com.ar - Partido de la Red' +
        '&description=' + 'Conocé todas las concesiones otorgadas por la Ciudad de Buenos Aires.' +
        '&redirect_uri='+location.origin+location.pathname+'close.html' +
        '&display=popup'
    , 'Compartir las concesiones', 'width=900,height=300,menubar=no,status=no,titlebar=no,top=200,left='+(screen.width-900)/2);
}