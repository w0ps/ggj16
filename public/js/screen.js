function initCallback() {
  var controllerUrl = location.host + '/controller/' + gameId,
      qrcode = new QRCode( document.getElementById( 'qrcode' ), {
      text: controllerUrl,
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
  } );

  console.log( controllerUrl );

  socket.emit( 'screen joined' );

  socket.on( 'player joined', function( name ) {
    console.log( 'player joined: ', name);
  } );
}

socketHandlers[ 'player joined' ] = console.log.bind( console, 'player joined' );

document.addEventListener( 'DOMContentLoaded', init );

